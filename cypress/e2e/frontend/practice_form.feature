# language: pt
@frontend
Funcionalidade: Practice Form
  Como estudante
  Quero preencher o formulário de cadastro do DemoQA
  Para registrar meus dados e confirmar o envio

  Cenário: Preencher e submeter o formulário com valores aleatórios e upload de arquivo .txt
    Dado que eu acesso o site DemoQA
    Quando eu escolho a opção "Forms" na página inicial
    E clico no submenu "Practice Form"
    E preencho todo o formulário com valores aleatórios
    E faço o upload do arquivo "arquivo-upload.txt"
    E submeto o formulário
    Então um popup de confirmação deve ser exibido com os dados enviados
    E fecho o popup
