from biblioteca import carregar_livros, adicionar_livro, listar_livros, avaliar_livro, remover_livro, filtrar_por_genero, ordenar_por_avaliacao

# ==============================
# MENU
# ==============================

def menu():
    print("\n=== Biblioteca Pessoal ===")
    print("1 - Adicionar livro")
    print("2 - Listar livros")
    print("3 - Avaliar livro")
    print("4 - Remover livro")
    print("5 - Filtrar por gênero")
    print("6 - Ver livros por avaliação")
    print("0 - Sair")


# ==============================
# FUNÇÃO PRINCIPAL
# ==============================

def main():
    carregar_livros()

    while True:
        menu()
        opcao = input("Escolha uma opção: ")

        if opcao == '1':
            adicionar_livro()
        elif opcao == '2':
            listar_livros()
        elif opcao == '3':
            avaliar_livro()
        elif opcao == '4':
            remover_livro()
        elif opcao == '5':
            filtrar_por_genero()
        elif opcao == '6':
            ordenar_por_avaliacao()
        elif opcao == '0':
            print("Saindo...")
            break
        else:
            print("Opção inválida. Tente novamente.")


# ==============================
# PONTO DE ENTRADA
# ==============================

if __name__ == "__main__":
    main()