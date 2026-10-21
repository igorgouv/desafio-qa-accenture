// Comandos customizados do Cypress (reutilizáveis em qualquer teste).

/**
 * cy.dragAndDrop(origem, destino)
 * Arrasta um elemento e solta sobre outro, disparando os eventos de "drag and drop" do HTML5
 * (dragstart -> dragenter -> dragover -> drop -> dragend).
 * O Sortable do DemoQA usa a biblioteca react-dnd, que escuta exatamente esses eventos.
 * O DataTransfer é o objeto que o navegador usa para "carregar" o item durante o arraste.
 */
Cypress.Commands.add('dragAndDrop', { prevSubject: 'element' }, (source, target) => {
  const dataTransfer = new DataTransfer();

  cy.wrap(source).trigger('dragstart', { dataTransfer });
  cy.wrap(target)
    .trigger('dragenter', { dataTransfer })
    .trigger('dragover', { dataTransfer })
    .trigger('drop', { dataTransfer });
  cy.wrap(source).trigger('dragend', { dataTransfer, force: true });
});
