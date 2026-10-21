// Arquivo carregado automaticamente antes de cada spec.
import './commands';

// O DemoQA às vezes lança erros de JavaScript próprios (anúncios, scripts de terceiros).
// Eles não fazem parte do que estamos testando, então não devem quebrar o teste.
Cypress.on('uncaught:exception', () => false);

// Bloqueia anúncios e scripts de terceiros que deixam o site lento
// e às vezes cobrem botões (ex.: o botão Submit do formulário).
beforeEach(() => {
  cy.intercept({ url: /googlesyndication|doubleclick|adservice|adplus|googletagservices|amazon-adsystem/ }, { statusCode: 204 });
});
