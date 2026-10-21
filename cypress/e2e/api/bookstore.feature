# language: pt
@api
Funcionalidade: API Book Store - Aluguel de livros
  Como usuário da Book Store do DemoQA
  Quero criar minha conta, me autenticar e alugar livros
  Para consultar os livros vinculados ao meu usuário

  Cenário: Criar usuário, autorizar, alugar dois livros e listar os detalhes do usuário
    Dado que eu crio um novo usuário com dados válidos
    Quando eu gero um token de acesso para esse usuário
    Então o usuário deve estar autorizado
    Quando eu listo os livros disponíveis na loja
    E eu alugo 2 livros de livre escolha
    Então os detalhes do usuário devem listar os 2 livros alugados
