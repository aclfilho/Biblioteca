import json
from livro import Livro

# ==============================
# CONFIGURAÇÃO
# ==============================

ARQUIVO = "livros.json"
livros = []

# ==============================
# PERSISTÊNCIA (Banco em JSON)
# ==============================

def carregar_livros(): # Função para carregar os livros do arquivo JSON, convertendo cada dicionário em um objeto Livro usando o método estático do_dict
    global livros
    try:
        with open(ARQUIVO, "r", encoding="utf-8") as arquivo:
            dados = json.load(arquivo)
            livros = [Livro.do_dict(d) for d in dados]
    except FileNotFoundError:
        livros = []


def salvar_livros(): # Função para salvar os livros no arquivo JSON, convertendo cada objeto Livro em um dicionário usando o método para_dict
    with open(ARQUIVO, "w", encoding="utf-8") as arquivo:
        json.dump([l.para_dict() for l in livros], arquivo, indent=4, ensure_ascii=False)


# ==============================
# FUNCIONALIDADES
# ==============================

def adicionar_livro(): 
    titulo = input("Digite o título do livro: ")
    autor = input("Digite o autor do livro: ")
    genero = input("Digite o gênero do livro: ")

    livro = Livro(titulo, autor, genero)

    livros.append(livro)
    salvar_livros()

    print(f"✅ '{livro.titulo}' adicionado com sucesso!")


def listar_livros(): 
    if not livros:
        print("Nenhum livro cadastrado.")
        return

    print("\n=== Lista de Livros ===")

    for indice, livro in enumerate(livros, start=1):
        print(f"{indice}. {livro}")


def remover_livro():
    listar_livros()

    if not livros:
        return

    try:
        indice = int(input("Digite o número do livro que deseja remover: "))
        livro_removido = livros.pop(indice - 1)
        salvar_livros()
        print(f"✅ Livro removido: {livro_removido.titulo}")
    except (ValueError, IndexError):
        print("Número inválido.")

def avaliar_livro():
    listar_livros()

    if not livros:
        return

    try:
        indice = int(input("Digite o número do livro que deseja avaliar: "))
        avaliacao = int(input("Digite a avaliação (1-5): "))

        if livros[indice - 1].avaliar(avaliacao):
            salvar_livros()
            print("✅ Avaliação salva com sucesso!")
        else:
            print("Avaliação deve ser entre 1 e 5.")
    except (ValueError, IndexError):
        print("Entrada inválida.")

def filtrar_por_genero():
    if not livros:
        print("Nenhum livro cadastrado.")
        return

    genero = input("Digite o gênero que deseja filtrar: ").strip().lower()
    resultado = [l for l in livros if l.genero.lower() == genero]

    if not resultado:
        print(f"Nenhum livro encontrado com o gênero '{genero}'.")
        return

    print(f"\n=== Livros do gênero '{genero}' ===")
    for indice, livro in enumerate(resultado, start=1):
        print(f"{indice}. {livro}")

def ordenar_por_avaliacao():
    if not livros:
        print("Nenhum livro cadastrado.")
        return

    avaliados = [l for l in livros if l.avaliacao is not None]

    if not avaliados:
        print("Nenhum livro avaliado ainda.")
        return

    ordenados = sorted(avaliados, key=lambda l: l.avaliacao, reverse=True)

    print("\n=== Livros por Avaliação ===")
    for indice, livro in enumerate(ordenados, start=1):
        print(f"{indice}. {livro}")
        