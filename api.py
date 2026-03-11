from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import biblioteca
from livro import Livro

# ==============================
# CONFIGURAÇÃO
# ==============================

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

biblioteca.carregar_livros()


# ==============================
# MODELO DE DADOS
# ==============================

class LivroInput(BaseModel):
    titulo: str
    autor: str
    genero: str = "Sem gênero"


# ==============================
# ROTAS
# ==============================

@app.get("/livros")
def listar():
    return [l.para_dict() for l in biblioteca.livros]


@app.post("/livros")
def adicionar(dados: LivroInput):
    livro = Livro(dados.titulo, dados.autor, dados.genero)
    biblioteca.livros.append(livro)
    biblioteca.salvar_livros()
    return livro.para_dict()


@app.put("/livros/{indice}/avaliar")
def avaliar(indice: int, nota: int = 0):
    if indice < 0 or indice >= len(biblioteca.livros):
        raise HTTPException(status_code=404, detail="Livro não encontrado")
    if not biblioteca.livros[indice].avaliar(nota):
        raise HTTPException(status_code=400, detail="Nota inválida, use 1 a 5")
    biblioteca.salvar_livros()
    return biblioteca.livros[indice].para_dict()


@app.delete("/livros/{indice}")
def remover(indice: int):
    if indice < 0 or indice >= len(biblioteca.livros):
        raise HTTPException(status_code=404, detail="Livro não encontrado")
    livro_removido = biblioteca.livros.pop(indice)
    biblioteca.salvar_livros()
    return {"mensagem": f"'{livro_removido.titulo}' removido com sucesso"}