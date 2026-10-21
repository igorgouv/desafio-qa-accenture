# language: pt
@frontend
Funcionalidade: Sortable
  Como usuário do DemoQA
  Quero reordenar os itens da lista arrastando e soltando
  Para deixá-los em ordem crescente

  Cenário: Colocar os elementos da lista em ordem crescente usando drag and drop
    Dado que eu acesso o site DemoQA
    Quando eu escolho a opção "Interactions" na página inicial
    E clico no submenu "Sortable"
    E a lista está fora de ordem
    E eu ordeno os elementos em ordem crescente usando drag and drop
    Então os elementos devem estar na ordem "One, Two, Three, Four, Five, Six"
