import BasePage from './BasePage';

/**
 * Page Object da tela "Browser Windows" (/browser-windows).
 *
 * Importante: o Cypress roda dentro de UMA aba do navegador e não controla janelas novas.
 * A estratégia recomendada pela documentação do Cypress é:
 *  1. "espionar" (stub) o window.open para capturar a URL que seria aberta;
 *  2. abrir essa URL na mesma aba (cy.visit) e validar o conteúdo;
 *  3. voltar para a página original, o que equivale a fechar a nova janela.
 */
class BrowserWindowsPage extends BasePage {
  elements = {
    newTabButton: () => cy.get('#tabButton'),
    newWindowButton: () => cy.get('#windowButton'),
    newWindowMessageButton: () => cy.get('#messageWindowButton'),
    sampleHeading: () => cy.get('#sampleHeading'),
  };

  /** Substitui o window.open por um stub com o alias @windowOpen. */
  stubWindowOpen() {
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });
  }

  clickNewWindow() {
    this.elements.newWindowButton().click();
  }

  /** Confirma que uma nova janela foi solicitada e devolve a URL dela. */
  getOpenedWindowUrl() {
    return cy
      .get('@windowOpen')
      .should('have.been.calledOnce')
      .its('firstCall.args.0');
  }

  openWindowUrl(url) {
    cy.visit(url);
  }

  shouldShowSampleMessage(message) {
    cy.location('pathname').should('eq', '/sample');
    this.elements.sampleHeading().should('be.visible').and('have.text', message);
  }

  /** "Fecha" a nova janela voltando para a página de origem. */
  closeNewWindow() {
    cy.go('back');
    cy.location('pathname').should('eq', '/browser-windows');
    this.elements.newWindowButton().should('be.visible');
  }
}

export default new BrowserWindowsPage();
