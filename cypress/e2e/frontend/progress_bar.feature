# language: pt
@frontend
Funcionalidade: Progress Bar
  Como usuário do DemoQA
  Quero controlar a barra de progresso
  Para validar que ela para, completa e reinicia corretamente

  Cenário: Parar a barra antes dos 25%, completar até 100% e resetar
    Dado que eu acesso o site DemoQA
    Quando eu escolho a opção "Widgets" na página inicial
    E clico no submenu "Progress Bar"
    E clico no botão Start da barra de progresso
    E paro a barra de progresso antes dos 25%
    Então o valor da barra de progresso deve ser menor ou igual a 25%
    Quando eu clico em Start novamente e aguardo a barra chegar a 100%
    Então eu reseto a barra de progresso
