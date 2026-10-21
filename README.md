# Desafio QA Automation – Accenture

Automação do desafio técnico de QA Automation da Accenture, feita com **Cypress + Cucumber (BDD)** e o padrão **Page Object**.
Os cenários estão escritos em Gherkin em português.

Todos os fluxos (API e Frontend) rodam em **uma única execução**: `npm test`.

## O que foi automatizado

| Parte | Fluxo | Arquivo `.feature` |
|---|---|---|
| 1 – API | Criar usuário → gerar token → validar autorização → listar livros → alugar 2 livros → listar detalhes do usuário | `cypress/e2e/api/bookstore.feature` |
| 2 – Frontend | Practice Form (formulário com dados aleatórios e upload de `.txt`) | `cypress/e2e/frontend/practice_form.feature` |
| 2 – Frontend | Browser Windows (nova janela e mensagem "This is a sample page") | `cypress/e2e/frontend/browser_windows.feature` |
| 2 – Frontend | Web Tables (criar, editar e deletar) + **bônus**: 12 registros via Cucumber | `cypress/e2e/frontend/web_tables.feature` |
| 2 – Frontend | Progress Bar (parar antes de 25%, completar e resetar) | `cypress/e2e/frontend/progress_bar.feature` |
| 2 – Frontend | Sortable (ordem crescente com drag and drop) | `cypress/e2e/frontend/sortable.feature` |

## Tecnologias

- [Cypress](https://www.cypress.io/) 15 (JavaScript)
- [@badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor) para BDD com Gherkin
- [esbuild](https://esbuild.github.io/) para empacotar os testes
- [@faker-js/faker](https://fakerjs.dev/) para gerar massa de dados aleatória
- GitHub Actions para rodar a suíte a cada push

## Estrutura do projeto

```
cypress/
├── e2e/                         # Cenários em Gherkin (o "o quê")
│   ├── api/bookstore.feature
│   └── frontend/*.feature
├── fixtures/uploads/
│   └── arquivo-upload.txt       # Arquivo .txt usado no upload do Practice Form
└── support/
    ├── api/BookStoreService.js  # Service Object: um método por endpoint da API
    ├── pages/                   # Page Objects: seletores e ações de cada tela
    │   ├── BasePage.js
    │   ├── PracticeFormPage.js
    │   ├── BrowserWindowsPage.js
    │   ├── WebTablesPage.js
    │   ├── ProgressBarPage.js
    │   └── SortablePage.js
    ├── step_definitions/        # Ligação entre o Gherkin e o código (o "como")
    │   ├── api/
    │   └── frontend/
    ├── utils/dataFactory.js     # Geração de dados aleatórios
    ├── commands.js              # Comando customizado cy.dragAndDrop
    └── e2e.js                   # Configuração global (bloqueio de anúncios etc.)
cypress.config.js                # baseUrl, specPattern e plugin do Cucumber
```

## Como executar

Pré-requisito: [Node.js](https://nodejs.org/) 20 ou superior.

```bash
npm install          # instala as dependências
npm test             # roda TODOS os cenários (API + Frontend) em uma única execução
npm run test:api     # só a Parte 1 (API)
npm run test:front   # só a Parte 2 (Frontend)
npm run cy:open      # abre o Cypress no modo interativo
```

Depois da execução, o relatório do Cucumber fica em `reports/cucumber-report.html`.

O resultado da última execução, com os cenários validados e os bugs encontrados, está no [TEST_REPORT.md](TEST_REPORT.md).

## Decisões técnicas

- **Cucumber em português** (`# language: pt`): os cenários ficam legíveis para qualquer pessoa do time.
- **Page Object**: cada tela tem uma classe com seus seletores e ações. Os steps só chamam métodos, então se a tela mudar, o ajuste é feito em um único lugar.
- **Service Object para a API**: o `BookStoreService` concentra os endpoints. Os steps fazem as validações (status e corpo da resposta).
- **Dados aleatórios** com faker: cada execução usa usuários e registros novos, evitando conflito com dados de execuções anteriores.
- **Limpeza da massa**: o usuário criado na API é removido ao final (hook `After` com a tag `@api`).
- **Browser Windows**: o Cypress controla apenas uma aba. Por isso, o `window.open` é interceptado com `cy.stub` (garante que a nova janela foi solicitada e captura a URL). A URL é aberta na mesma aba para validar a mensagem, e "fechar a janela" volta para a página original. Essa é a abordagem recomendada pela documentação do Cypress.
- **Progress Bar**: o teste espera a barra passar de 15% e clica em Stop, com margem de segurança para o limite de 25%. As esperas usam as re-tentativas do próprio Cypress (`should`), não tempos fixos.
- **Sortable**: o DemoQA usa a biblioteca react-dnd (drag and drop do HTML5). O comando `cy.dragAndDrop` dispara os eventos `dragstart`, `dragenter`, `dragover`, `drop` e `dragend`. Como a lista às vezes já abre ordenada, o teste primeiro a embaralha (na ordem do print do desafio) e depois a ordena.
- **Anúncios bloqueados**: os anúncios do DemoQA deixam o site lento e cobrem botões, então são bloqueados com `cy.intercept`.

## Bugs encontrados no DemoQA durante a automação

1. **Practice Form**: o botão "Close" do popup de confirmação não fecha o popup.
2. **Web Tables**: deletar um registro novo remove todos os registros adicionados.

Passos para reproduzir, resultado esperado e obtido de cada bug estão no [TEST_REPORT.md](TEST_REPORT.md).

## Autor

Igor Gouveia Barbosa – [LinkedIn](https://www.linkedin.com/in/igor-gouveia-barbosa-b492a2211/) · [GitHub](https://github.com/igorgouv)
