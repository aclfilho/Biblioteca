import { useEffect, useState } from "react"
import axios from "axios"
import Estatisticas from "./Estatisticas"

const API = "http://localhost:8000"

function App() {
  const [livros, setLivros] = useState([])
  const [titulo, setTitulo] = useState("")
  const [autor, setAutor] = useState("")
  const [genero, setGenero] = useState("")
  const [filtro, setFiltro] = useState("")
  const [mostrarForm, setMostrarForm] = useState(false)
  const [pagina, setPagina] = useState("home")

  useEffect(() => { buscarLivros() }, [])

  function buscarLivros() {
    axios.get(`${API}/livros`).then(res => setLivros(res.data))
  }

  function adicionarLivro() {
    if (!titulo || !autor) return
    axios.post(`${API}/livros`, { titulo, autor, genero }).then(() => {
      buscarLivros()
      setTitulo("")
      setAutor("")
      setGenero("")
      setMostrarForm(false)
    })
  }

  function avaliarLivro(indice, nota) {
    axios.put(`${API}/livros/${indice}/avaliar?nota=${nota}`).then(buscarLivros)
  }

  function removerLivro(indice) {
    axios.delete(`${API}/livros/${indice}`).then(buscarLivros)
  }

  const livrosFiltrados = filtro
    ? livros.filter(l => l.genero.toLowerCase().includes(filtro.toLowerCase()))
    : livros

  const mediaAvaliacao = livros.filter(l => l.avaliacao).length > 0
    ? (livros.reduce((s, l) => s + (l.avaliacao || 0), 0) / livros.filter(l => l.avaliacao).length).toFixed(1)
    : "—"

  if (pagina === "estatisticas") {
    return <Estatisticas onVoltar={() => setPagina("home")} />
  }

  return (
    <div style={{ minHeight: "100vh", background: "#1C1C1E", fontFamily: "'Georgia', serif", color: "#F0EDE8" }}>

      {/* Sidebar */}
      <div style={{
        position: "fixed", left: 0, top: 0, bottom: 0, width: "260px",
        background: "#2C2825", borderRight: "1px solid #3A3330",
        padding: "40px 28px", display: "flex", flexDirection: "column", gap: "8px", zIndex: 10
      }}>
        <div style={{ marginBottom: "32px" }}>
          <div style={{ fontSize: "22px", fontWeight: "700", letterSpacing: "-0.5px", color: "#F5F0E8" }}>
            📚 Biblioteca
          </div>
          <div style={{ fontSize: "12px", color: "#8A7F75", marginTop: "4px", letterSpacing: "1px" }}>
            PESSOAL
          </div>
        </div>

        {/* Stats */}
        {[
          { label: "Livros", value: livros.length },
          { label: "Avaliados", value: livros.filter(l => l.avaliacao).length },
          { label: "Média", value: mediaAvaliacao },
        ].map(stat => (
          <div key={stat.label} style={{
            background: "#3A3330", borderRadius: "10px", padding: "14px 16px", marginBottom: "4px"
          }}>
            <div style={{ fontSize: "24px", fontWeight: "700", color: "#F5F0E8" }}>{stat.value}</div>
            <div style={{ fontSize: "11px", color: "#8A7F75", letterSpacing: "1px", marginTop: "2px" }}>{stat.label.toUpperCase()}</div>
          </div>
        ))}

        <div style={{ flex: 1 }} />

        {/* Filtro */}
        <div>
          <div style={{ fontSize: "11px", color: "#8A7F75", letterSpacing: "1px", marginBottom: "8px" }}>FILTRAR POR GÊNERO</div>
          <input
            style={{
              width: "100%", background: "#3A3330", border: "none", borderRadius: "8px",
              padding: "10px 12px", color: "#F5F0E8", fontSize: "13px", outline: "none",
              boxSizing: "border-box", fontFamily: "Georgia, serif"
            }}
            placeholder="Ex: Romance..."
            value={filtro}
            onChange={e => setFiltro(e.target.value)}
          />
        </div>
      </div>

      {/* Main */}
      <div style={{ marginLeft: "260px", padding: "48px", background: "#1C1C1E", minHeight: "100vh" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "40px" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "32px", fontWeight: "700", letterSpacing: "-1px", color: "#F0EDE8" }}>
              Meus Livros
            </h1>
            <p style={{ margin: "6px 0 0", fontSize: "14px", color: "#8A7F75" }}>
              {livrosFiltrados.length} livro{livrosFiltrados.length !== 1 ? "s" : ""} encontrado{livrosFiltrados.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => setPagina("estatisticas")}
              style={{
                background: "#3A3330", color: "#F5F0E8", border: "none",
                borderRadius: "10px", padding: "12px 24px", fontSize: "14px",
                cursor: "pointer", fontFamily: "Georgia, serif", transition: "all 0.15s"
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#4A4540"}
              onMouseLeave={e => e.currentTarget.style.background = "#3A3330"}
            >
              📊 Estatísticas
            </button>
            <button
              onClick={() => setMostrarForm(!mostrarForm)}
              style={{
                background: mostrarForm ? "#3A3330" : "#4A4540",
                color: "#F5F0E8", border: "none",
                borderRadius: "10px", padding: "12px 24px", fontSize: "14px",
                cursor: "pointer", fontFamily: "Georgia, serif", transition: "all 0.15s"
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#5A5550"}
              onMouseLeave={e => e.currentTarget.style.background = mostrarForm ? "#3A3330" : "#4A4540"}
            >
              {mostrarForm ? "✕ Cancelar" : "+ Adicionar livro"}
            </button>
          </div>
        </div>

        {/* Formulário */}
        {mostrarForm && (
          <div style={{
            background: "#2C2C2E", borderRadius: "16px", padding: "28px",
            marginBottom: "32px", border: "1px solid #3A3A3C"
          }}>
            <h2 style={{ margin: "0 0 20px", fontSize: "16px", fontWeight: "600", color: "#F0EDE8" }}>Novo livro</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "16px" }}>
              {[
                { placeholder: "Título *", value: titulo, set: setTitulo },
                { placeholder: "Autor *", value: autor, set: setAutor },
                { placeholder: "Gênero", value: genero, set: setGenero },
              ].map(field => (
                <input
                  key={field.placeholder}
                  style={{
                    background: "#3A3A3C", border: "1px solid #4A4A4C", borderRadius: "8px",
                    padding: "10px 14px", fontSize: "14px", fontFamily: "Georgia, serif",
                    color: "#F0EDE8", outline: "none"
                  }}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={e => field.set(e.target.value)}
                />
              ))}
            </div>
            <button
              onClick={adicionarLivro}
              style={{
                background: "#4A4540", color: "#F5F0E8", border: "none",
                borderRadius: "8px", padding: "10px 24px", fontSize: "14px",
                cursor: "pointer", fontFamily: "Georgia, serif", transition: "all 0.15s"
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#5A5550"}
              onMouseLeave={e => e.currentTarget.style.background = "#4A4540"}
            >
              Salvar
            </button>
          </div>
        )}

        {/* Lista */}
        {livrosFiltrados.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#8A7F75" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📖</div>
            <p style={{ fontSize: "16px" }}>Nenhum livro encontrado.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
            {livrosFiltrados.map((livro, i) => (
              <div key={i} style={{
                background: "#2C2C2E", borderRadius: "16px", padding: "24px",
                border: "1px solid #3A3A3C", position: "relative",
                transition: "transform 0.15s, border-color 0.15s", cursor: "default"
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-3px)"
                  e.currentTarget.style.borderColor = "#5A5A5C"
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.borderColor = "#3A3A3C"
                }}
              >
                {/* Remover */}
                <button
                  onClick={() => removerLivro(i)}
                  style={{
                    position: "absolute", top: "16px", right: "16px",
                    background: "none", border: "none", cursor: "pointer",
                    color: "#6A6A6C", fontSize: "16px", lineHeight: 1,
                    transition: "color 0.15s"
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = "#E05C5C"}
                  onMouseLeave={e => e.currentTarget.style.color = "#6A6A6C"}
                >✕</button>

                {/* Gênero */}
                {livro.genero && (
                  <div style={{
                    display: "inline-block", fontSize: "10px", letterSpacing: "1.5px",
                    color: "#A09890", background: "#3A3A3C", borderRadius: "20px",
                    padding: "3px 10px", marginBottom: "12px", textTransform: "uppercase"
                  }}>
                    {livro.genero}
                  </div>
                )}

                <h3 style={{ margin: "0 0 4px", fontSize: "17px", fontWeight: "700", lineHeight: "1.3", paddingRight: "24px", color: "#F0EDE8" }}>
                  {livro.titulo}
                </h3>
                <p style={{ margin: "0 0 16px", fontSize: "13px", color: "#A09890", fontStyle: "italic" }}>
                  {livro.autor}
                </p>

                {/* Estrelas */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: "4px" }}>
                    {[1, 2, 3, 4, 5].map(nota => (
                      <button
                        key={nota}
                        onClick={() => avaliarLivro(i, nota)}
                        style={{
                          background: "none", border: "none", cursor: "pointer",
                          fontSize: "18px", padding: "0",
                          color: nota <= (livro.avaliacao || 0) ? "#C4903A" : "#4A4A4C",
                          transition: "transform 0.1s, color 0.1s"
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.3)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                      >★</button>
                    ))}
                  </div>
                  <span style={{ fontSize: "11px", color: "#6A6A6C" }}>{livro.data_leitura}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App