# language: pt
@frontend
Funcionalidade: Browser Windows
  Como usuário do DemoQA
  Quero abrir uma nova janela a partir de um botão
  Para validar o conteúdo exibido nela

  Cenário: Abrir uma nova janela, validar a mensagem e fechá-la
    Dado que eu acesso o site DemoQA
    Quando eu escolho a opção "Alerts, Frame & Windows" na página inicial
    E clico no submenu "Browser Windows"
    E clico no botão "New Window"
    Então uma nova janela deve ser aberta com a mensagem "This is a sample page"
    E fecho a nova janela aberta
