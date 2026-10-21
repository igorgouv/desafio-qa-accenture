import BasePage from './BasePage';

/**
 * Page Object da tela "Progress Bar" (/progress-bar).
 *
 * A barra avança cerca de 1% a cada 100 ms.
 * Para parar ANTES dos 25%, esperamos a barra passar de um valor seguro (ex.: 15%)
 * e clicamos em Stop. O "should" do Cypress fica re-tentando a leitura até a condição
 * ser verdadeira, então não usamos cy.wait com tempo fixo.
 */
class ProgressBarPage extends BasePage {
  elements = {
    progressBar: () => cy.get('#progressBar [role="progressbar"]'),
    startStopButton: () => cy.get('#startStopButton'),
    resetButton: () => cy.get('#resetButton'),
  };

  /** Lê o valor atual da barra (atributo aria-valuenow) como número. */
  getProgressValue() {
    return this.elements.progressBar().invoke('attr', 'aria-valuenow').then(Number);
  }

  clickStart() {
    this.elements.startStopButton().should('have.text', 'Start').click();
  }

  /** Espera a barra chegar a "minValue" e clica em Stop imediatamente. */
  stopWhenReaches(minValue) {
    this.elements.progressBar().should(($bar) => {
      expect(Number($bar.attr('aria-valuenow'))).to.be.at.least(minValue);
    });
    this.elements.startStopButton().should('have.text', 'Stop').click();
    this.elements.startStopButton().should('have.text', 'Start');
  }

  shouldBeAtMost(maxValue) {
    this.getProgressValue().then((value) => {
      cy.log(`Valor da barra após o Stop: ${value}%`);
      expect(value).to.be.at.most(maxValue);
    });
  }

  /** Espera até a barra completar (timeout maior, pois leva alguns segundos). */
  waitUntilComplete() {
    cy.get('#progressBar [role="progressbar"]', { timeout: 20000 })
      .should('have.attr', 'aria-valuenow', '100')
      .and('have.text', '100%');
  }

  clickReset() {
    this.elements.resetButton().scrollIntoView().should('be.visible');
    // O botão Reset aparece no mesmo instante em que a barra chega a 100%.
    // Uma pequena espera deixa o React terminar de renderizar antes do clique
    // (sem ela, o clique às vezes acontecia antes do botão estar "pronto").
    cy.wait(500);
    this.elements.resetButton().click();
  }

  shouldBeReset() {
    this.elements.progressBar().should('have.attr', 'aria-valuenow', '0');
    this.elements.startStopButton().should('have.text', 'Start');
  }
}

export default new ProgressBarPage();
