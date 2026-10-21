/**
 * Page Object base: ações comuns a todas as páginas do DemoQA.
 * As outras páginas herdam (extends) desta classe.
 */
export default class BasePage {
  /** Abre a página inicial (usa o baseUrl do cypress.config.js). */
  visitHome() {
    cy.visit('/');
  }

  /** Clica em um dos cards da página inicial (Elements, Forms, Widgets...). */
  chooseHomeCard(cardName) {
    cy.contains('.card h5', cardName).scrollIntoView().click();
  }

  /** Clica em um item do menu lateral (submenu). */
  clickSubmenu(submenuName) {
    cy.contains('li span.text', new RegExp(`^${Cypress._.escapeRegExp(submenuName)}$`))
      .scrollIntoView()
      .click();
  }

  /** Confere o título principal da página aberta. */
  shouldHaveTitle(title) {
    cy.get('h1').should('have.text', title);
  }
}
