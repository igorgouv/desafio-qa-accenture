# language: pt
@frontend
Funcionalidade: Web Tables
  Como usuário do DemoQA
  Quero gerenciar registros na tabela
  Para criar, editar e excluir pessoas cadastradas

  Contexto:
    Dado que eu acesso o site DemoQA
    Quando eu escolho a opção "Elements" na página inicial
    E clico no submenu "Web Tables"

  Cenário: Criar, editar e deletar um novo registro
    Quando eu crio um novo registro na tabela
    Então o novo registro deve ser exibido na tabela
    Quando eu edito o registro criado
    Então a tabela deve exibir os dados editados
    Quando eu deleto o registro criado
    Então o registro não deve mais ser exibido na tabela

  @bonus
  Cenário: Criar 12 novos registros de forma dinâmica e deletar todos
    Quando eu crio os seguintes registros na tabela:
      | firstName | lastName  | email                      | age | salary | department  |
      | Ana       | Souza     | ana.souza@qa-teste.com     | 25  | 4500   | QA          |
      | Bruno     | Lima      | bruno.lima@qa-teste.com    | 31  | 6200   | Engineering |
      | Carla     | Mendes    | carla.mendes@qa-teste.com  | 28  | 5100   | Legal       |
      | Diego     | Ferreira  | diego.ferreira@qa-teste.com| 35  | 7800   | Insurance   |
      | Elisa     | Rocha     | elisa.rocha@qa-teste.com   | 22  | 3900   | Compliance  |
      | Fabio     | Alves     | fabio.alves@qa-teste.com   | 40  | 9100   | QA          |
      | Gabriela  | Costa     | gabriela.costa@qa-teste.com| 27  | 5600   | Engineering |
      | Heitor    | Ribeiro   | heitor.ribeiro@qa-teste.com| 33  | 6700   | Legal       |
      | Isabela   | Martins   | isabela.martins@qa-teste.com| 29 | 5300   | Insurance   |
      | Joao      | Carvalho  | joao.carvalho@qa-teste.com | 38  | 8400   | Compliance  |
      | Karina    | Barbosa   | karina.barbosa@qa-teste.com| 24  | 4200   | QA          |
      | Lucas     | Pereira   | lucas.pereira@qa-teste.com | 30  | 6000   | Engineering |
    Então os 12 registros criados devem ser exibidos na tabela
    Quando eu deleto todos os registros criados
    Então nenhum dos registros criados deve ser exibido na tabela
