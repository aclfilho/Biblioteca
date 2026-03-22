import { useEffect, useState } from "react"
import axios from "axios"

const API = "http://localhost:8000"
const CORES = ["#C4903A", "#A07830", "#D4A857", "#7A5C24", "#8A6030"]

export default function Estatisticas({ onVoltar }) {
  const [livros, setLivros] = useState([])

  useEffect(() => {
    axios.get(`${API}/livros`).then(res => setLivros(res.data))
  }, [])

  // Top 5 livros mais bem avaliados
  const top5 = [...livros]
    .filter(l => l.avaliacao)
    .sort((a, b) => b.avaliacao - a.avaliacao)
    .slice(0, 5)

  // Gêneros mais lidos
  const generoMap = {}
  livros.forEach(l => {
    const g = l.genero || "Sem gênero"
    generoMap[g] = (generoMap[g] || 0) + 1
  })
  const generos = Object.entries(generoMap)
    .sort((a, b) => b[1] - a[1])
  const maxGenero = generos[0]?.[1] || 1

  const mediaAvaliacao = livros.filter(l => l.avaliacao).length > 0
    ? (livros.reduce((s, l) => s + (l.avaliacao || 0), 0) / livros.filter(l => l.avaliacao).length).toFixed(1)
    : "—"

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

        {[
          { label: "Total de Livros", value: livros.length },
          { label: "Avaliados", value: livros.filter(l => l.avaliacao).length },
          { label: "Média Geral", value: mediaAvaliacao },
          { label: "Gêneros", value: generos.length },
        ].map(stat => (
          <div key={stat.label} style={{
            background: "#3A3330", borderRadius: "10px", padding: "14px 16px", marginBottom: "4px"
          }}>
            <div style={{ fontSize: "24px", fontWeight: "700", color: "#F5F0E8" }}>{stat.value}</div>
            <div style={{ fontSize: "11px", color: "#8A7F75", letterSpacing: "1px", marginTop: "2px" }}>{stat.label.toUpperCase()}</div>
          </div>
        ))}

        <div style={{ flex: 1 }} />

        <button
          onClick={onVoltar}
          style={{
            background: "#3A3330", color: "#F5F0E8", border: "none",
            borderRadius: "10px", padding: "12px 24px", fontSize: "14px",
            cursor: "pointer", fontFamily: "Georgia, serif", transition: "all 0.15s"
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#4A4540"}
          onMouseLeave={e => e.currentTarget.style.background = "#3A3330"}
        >
          ← Voltar
        </button>
      </div>

      {/* Main */}
      <div style={{ marginLeft: "260px", padding: "48px", background: "#1C1C1E", minHeight: "100vh" }}>
        <h1 style={{ margin: "0 0 8px", fontSize: "32px", fontWeight: "700", letterSpacing: "-1px", color: "#F0EDE8" }}>
          Estatísticas
        </h1>
        <p style={{ margin: "0 0 40px", fontSize: "14px", color: "#8A7F75" }}>
          Uma visão geral da sua biblioteca
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>

          {/* Top 5 livros */}
          <div style={{
            background: "#2C2C2E", borderRadius: "16px", padding: "28px",
            border: "1px solid #3A3A3C"
          }}>
            <h2 style={{ margin: "0 0 24px", fontSize: "15px", fontWeight: "600", color: "#F0EDE8" }}>
              ⭐ Top 5 Mais Bem Avaliados
            </h2>
            {top5.length === 0 ? (
              <p style={{ color: "#8A7F75", fontSize: "13px" }}>Nenhum livro avaliado ainda.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {top5.map((livro, i) => (
                  <div key={i}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "13px", color: "#E0D8C8", maxWidth: "75%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {livro.titulo}
                      </span>
                      <span style={{ fontSize: "13px", color: "#C4903A", fontWeight: "700" }}>
                        {"★".repeat(livro.avaliacao)}
                      </span>
                    </div>
                    <div style={{ height: "6px", background: "#3A3A3C", borderRadius: "4px" }}>
                      <div style={{
                        height: "100%",
                        width: `${(livro.avaliacao / 5) * 100}%`,
                        background: `linear-gradient(90deg, #C4903A, #D4A857)`,
                        borderRadius: "4px",
                        transition: "width 0.6s ease"
                      }} />
                    </div>
                    <div style={{ fontSize: "11px", color: "#8A7F75", marginTop: "4px", fontStyle: "italic" }}>
                      {livro.autor}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Gêneros */}
          <div style={{
            background: "#2C2C2E", borderRadius: "16px", padding: "28px",
            border: "1px solid #3A3A3C"
          }}>
            <h2 style={{ margin: "0 0 24px", fontSize: "15px", fontWeight: "600", color: "#F0EDE8" }}>
              📖 Gêneros Mais Lidos
            </h2>
            {generos.length === 0 ? (
              <p style={{ color: "#8A7F75", fontSize: "13px" }}>Nenhum livro cadastrado ainda.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {generos.map(([nome, qtd], i) => (
                  <div key={i}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "13px", color: "#E0D8C8" }}>{nome}</span>
                      <span style={{ fontSize: "13px", color: CORES[i % CORES.length], fontWeight: "700" }}>
                        {qtd} livro{qtd !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div style={{ height: "6px", background: "#3A3A3C", borderRadius: "4px" }}>
                      <div style={{
                        height: "100%",
                        width: `${(qtd / maxGenero) * 100}%`,
                        background: CORES[i % CORES.length],
                        borderRadius: "4px",
                        transition: "width 0.6s ease"
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}