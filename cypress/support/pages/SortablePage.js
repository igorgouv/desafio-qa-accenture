import BasePage from './BasePage';

/**
 * Page Object da tela "Sortable" (/sortable), aba "List".
 */
class SortablePage extends BasePage {
  elements = {
    listTab: () => cy.get('#demo-tab-list'),
    items: () => cy.get('#demo-tabpane-list .list-group-item'),
    itemByText: (text) => cy.contains('#demo-tabpane-list .list-group-item', new RegExp(`^${text}$`)),
  };

  openListTab() {
    this.elements.listTab().click();
  }

  /** Devolve os textos dos itens na ordem em que aparecem na tela. */
  getItemsOrder() {
    return this.elements.items().then(($items) => [...$items].map((item) => item.innerText.trim()));
  }

  /** Arrasta o item "text" e solta na posição "targetIndex" (0 = primeira posição). */
  moveItemToPosition(text, targetIndex) {
    this.elements.items().eq(targetIndex).then(($target) => {
      this.elements.itemByText(text).dragAndDrop($target);
    });
  }

  /**
   * Coloca a lista na ordem desejada, item a item:
   * para cada posição, arrasta o item correto até ela.
   * É o mesmo raciocínio do algoritmo "selection sort".
   */
  sortTo(expectedOrder) {
    expectedOrder.forEach((text, index) => {
      this.getItemsOrder().then((currentOrder) => {
        if (currentOrder[index] !== text) {
          this.moveItemToPosition(text, index);
        }
      });
    });
  }

  shouldHaveOrder(expectedOrder) {
    this.getItemsOrder().should('deep.equal', expectedOrder);
  }
}

export default new SortablePage();
