# 📚 Biblioteca Pessoal

Sistema web para registrar e organizar livros lidos, desenvolvido como projeto de aprendizado em Python e React.

---

## 🖥️ Demonstração

A interface permite adicionar livros, avaliar com estrelas, filtrar por gênero e visualizar estatísticas em tempo real.

---

## 🛠️ Tecnologias

**Backend**
- Python 3.x
- FastAPI — API REST
- Uvicorn — servidor ASGI
- Pydantic — validação de dados
- JSON — persistência local

**Frontend**
- React (Vite)
- Axios — requisições HTTP
- CSS inline — estilização

---

## 📁 Estrutura do Projeto

```
biblioteca/
│
├── backend/
│   ├── livro.py          # Classe Livro (POO)
│   ├── biblioteca.py     # Funções de manipulação
│   ├── api.py            # Rotas FastAPI
│   └── livros.json       # Banco de dados local
│
└── frontend/
    └── src/
        └── App.jsx       # Interface React
```

---

## 🚀 Como rodar o projeto

### Pré-requisitos

- Python 3.x instalado
- Node.js instalado

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/biblioteca-pessoal.git
cd biblioteca-pessoal
```

### 2. Instale as dependências do backend

```bash
pip install fastapi uvicorn
```

### 3. Inicie o servidor backend

```bash
uvicorn api:app --reload
```

O servidor estará disponível em `http://localhost:8000`

### 4. Instale as dependências do frontend

```bash
cd frontend
npm install
```

### 5. Inicie o frontend

```bash
npm run dev
```

A interface estará disponível em `http://localhost:5173`

---

## ⚙️ Funcionalidades

- ✅ Adicionar livros (título, autor, gênero)
- ✅ Listar todos os livros em cards
- ✅ Avaliar livros com estrelas (1 a 5)
- ✅ Filtrar livros por gênero
- ✅ Remover livros
- ✅ Persistência dos dados em JSON
- ✅ Estatísticas: total de livros, avaliados e média

---

## 🔌 Rotas da API

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/livros` | Lista todos os livros |
| `POST` | `/livros` | Adiciona um novo livro |
| `PUT` | `/livros/{id}/avaliar` | Avalia um livro |
| `DELETE` | `/livros/{id}` | Remove um livro |

Documentação interativa disponível em `http://localhost:8000/docs`

---

## 📖 Conceitos aprendidos

Este projeto foi desenvolvido em fases progressivas:

**Fase 1 — Fundamentos**
- Funções, listas e dicionários
- Persistência com JSON
- Tratamento de erros com `try/except`

**Fase 2 — Orientação a Objetos**
- Classe `Livro` com atributos e métodos
- Separação do código em módulos
- `__init__`, `__str__`, `@staticmethod`

**Fase 3 — Interface Web**
- API REST com FastAPI
- Interface com React e Axios
- Comunicação frontend ↔ backend

---

## 🗺️ Próximos passos

- [ ] Fase 4 — Banco de dados SQLite
- [ ] Busca por título ou autor
- [ ] Página de estatísticas com gráficos
- [ ] Publicação em nuvem

---

## 👤 Autor

Desenvolvido como projeto pessoal de aprendizado em Python e desenvolvimento web.