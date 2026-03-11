from datetime import date

class Livro: # Classe que representa um livro, com atributos para título, autor, gênero, status de leitura, avaliação e data de leitura
    def __init__(self, titulo, autor, genero="Sem gênero", status="lido"):
        self.titulo = titulo
        self.autor = autor
        self.genero = genero
        self.status = status
        self.avaliacao = None
        self.data_leitura = str(date.today())
        
    def avaliar(self, nota): # Método para avaliar o livro, garantindo que a nota esteja entre 1 e 5
        if 1 <= nota <= 5:
            self.avaliacao = nota
        else:
            print("Avaliação deve ser entre 1 e 5.")
    
    def para_dict(self): # Converte o objeto Livro para um dicionário, facilitando a serialização para JSON
        return {
            "titulo": self.titulo,
            "autor": self.autor,
            "genero": self.genero,
            "status": self.status,
            "avaliacao": self.avaliacao,
            "data_leitura": self.data_leitura
        }
    
    @staticmethod
    def do_dict(dados): # Método estático que cria um objeto Livro a partir de um dicionário, facilitando a desserialização de JSON
        livro = Livro(dados["titulo"], dados["autor"], dados.get("genero", "Sem gênero"), dados.get("status", "lido"))
        livro.avaliacao = dados.get("avaliacao")
        livro.data_leitura = dados.get("data_leitura", str(date.today()))
        return livro            
    
    def __str__(self): # Método para representar o objeto Livro como uma string, facilitando a exibição das informações do livro
        avaliacao_str = f"Avaliação: {self.avaliacao}" if self.avaliacao is not None else "Sem avaliação"
        return f"{self.titulo} - {self.autor} | Gênero: {self.genero} | Status: {self.status} | {avaliacao_str} | Lido em: {self.data_leitura}"