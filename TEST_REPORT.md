# Test Report – Desafio QA Automation (Accenture)

**Resultado:** 7 de 7 cenários aprovados, em uma única execução (`npm test`), com duração de 1min28.
Durante a automação foram encontrados **2 bugs** e **2 comportamentos de atenção** no DemoQA, descritos abaixo.

## Ambiente da execução

| Item | Valor |
|---|---|
| Data | 21/10/2026 |
| Aplicação | https://demoqa.com (Book Store API + páginas de demonstração) |
| Ferramentas | Cypress 15.21.1, cypress-cucumber-preprocessor 28.0.0 |
| Navegador | Electron 138 (headless) |
| Node.js | v24.22.0 |
| Sistema operacional | Windows 11 |
| Comando | `npm test` (executa API e Frontend juntos) |

## Resumo da execução

| # | Parte | Feature | Cenário | Resultado | Duração |
|---|---|---|---|---|---|
| 1 | 1 – API | `api/bookstore.feature` | Criar usuário, autorizar, alugar dois livros e listar os detalhes do usuário | ✅ Aprovado | 4,1 s |
| 2 | 2 – Frontend | `frontend/practice_form.feature` | Preencher e submeter o formulário com valores aleatórios e upload de arquivo .txt | ✅ Aprovado | 6,2 s |
| 3 | 2 – Frontend | `frontend/browser_windows.feature` | Abrir uma nova janela, validar a mensagem e fechá-la | ✅ Aprovado | 2,9 s |
| 4 | 2 – Frontend | `frontend/web_tables.feature` | Criar, editar e deletar um novo registro | ✅ Aprovado | 10,3 s |
| 5 | 2 – Frontend | `frontend/web_tables.feature` | **Bônus:** criar 12 novos registros de forma dinâmica e deletar todos | ✅ Aprovado | 48,2 s |
| 6 | 2 – Frontend | `frontend/progress_bar.feature` | Parar a barra antes dos 25%, completar até 100% e resetar | ✅ Aprovado | 13,1 s |
| 7 | 2 – Frontend | `frontend/sortable.feature` | Colocar os elementos da lista em ordem crescente usando drag and drop | ✅ Aprovado | 3,7 s |

## O que cada cenário valida

**1. API Book Store**
- `POST /Account/v1/User`: status 201, `userID` retornado e lista de livros vazia.
- `POST /Account/v1/GenerateToken`: status 200, `status: Success` e token preenchido.
- `POST /Account/v1/Authorized`: status 200 e retorno `true`.
- `GET /BookStore/v1/Books`: status 200 e todos os livros com `isbn`, `title` e `author`.
- `POST /BookStore/v1/Books` (com token Bearer): status 201 e os 2 ISBNs escolhidos.
- `GET /Account/v1/User/{userID}`: status 200 e os 2 livros alugados nos detalhes do usuário.
- Ao final, o usuário é removido (`DELETE /Account/v1/User/{userID}`, status 204).

**2. Practice Form**: popup "Thanks for submitting the form" aberto e cada valor enviado conferido (nome, e-mail, gênero, celular, data de nascimento, matérias, hobbies, arquivo, endereço, estado e cidade). O popup é fechado ao final.

**3. Browser Windows**: o clique em "New Window" solicita a abertura de uma nova janela para `/sample`, a página exibe "This is a sample page" e o fluxo volta à tela original.

**4 e 5. Web Tables**: o registro aparece na tabela com todos os campos após criar e após editar, e some após deletar. No bônus, os 12 registros da tabela do Cucumber são criados, validados e removidos.

**6. Progress Bar**: a barra para com valor ≤ 25%, completa 100% e volta a 0% após o Reset.

**7. Sortable**: a lista é embaralhada e depois reordenada com drag and drop, terminando em One, Two, Three, Four, Five, Six.

## Bugs encontrados

### BUG-01 – Practice Form: botão "Close" do popup de confirmação não fecha o popup

| Campo | Detalhe |
|---|---|
| Severidade | Média (o usuário fica preso no popup até usar ESC ou recarregar a página) |
| Página | https://demoqa.com/automation-practice-form |

**Passos para reproduzir**
1. Preencher os campos obrigatórios do formulário.
2. Clicar em **Submit**.
3. No popup "Thanks for submitting the form", clicar em **Close**.

**Resultado esperado:** o popup fecha.
**Resultado obtido:** o popup continua aberto e o console do navegador mostra `TypeError: findDOMNode is not a function`.
**Como a automação lida:** clica em Close e, em seguida, envia a tecla ESC, que fecha o popup. A validação final garante que o popup não está mais na tela.

### BUG-02 – Web Tables: deletar um registro novo remove todos os registros adicionados

| Campo | Detalhe |
|---|---|
| Severidade | Alta (perda de dados não solicitada) |
| Página | https://demoqa.com/webtables |

**Passos para reproduzir**
1. Adicionar 3 registros novos pelo botão **Add**.
2. Clicar no ícone de lixeira de **apenas um** dos registros novos.

**Resultado esperado:** só o registro escolhido é removido; os outros 2 permanecem.
**Resultado obtido:** os 3 registros novos são removidos e a tabela volta a mostrar apenas os 3 registros iniciais (Cierra, Alden e Kierra).
**Como a automação lida:** no cenário bônus, cada registro é deletado apenas se ainda estiver na tabela. A validação final garante que nenhum dos 12 registros permaneceu.

## Pontos de atenção

- **Sortable**: a lista abre hoje em ordem crescente (One a Six), diferente da imagem do desafio (Six, Two, One, Four, Five, Three). Para o teste ser significativo, o cenário primeiro deixa a lista na ordem da imagem usando drag and drop e só depois a ordena.
- **Progress Bar**: ao chegar a 100%, um clique em **Reset** feito no mesmo instante em que o botão aparece às vezes é ignorado. A automação aguarda 500 ms antes de clicar.

## Como reproduzir esta execução

```bash
npm install
npm test
```

O relatório HTML do Cucumber é gerado em `reports/cucumber-report.html`.
