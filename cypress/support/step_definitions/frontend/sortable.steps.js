import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import sortablePage from '../../pages/SortablePage';

const ORDEM_CRESCENTE = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];

When('a lista está fora de ordem', () => {
  sortablePage.openListTab();

  // A lista do DemoQA pode abrir já ordenada. Para o teste fazer sentido,
  // embaralhamos a lista também com drag and drop e conferimos que ficou fora de ordem.
  const embaralhada = ['Six', 'Two', 'One', 'Four', 'Five', 'Three']; // mesma ordem do print do desafio
  sortablePage.sortTo(embaralhada);
  sortablePage.shouldHaveOrder(embaralhada);
});

When('eu ordeno os elementos em ordem crescente usando drag and drop', () => {
  sortablePage.sortTo(ORDEM_CRESCENTE);
});

Then('os elementos devem estar na ordem {string}', (ordem) => {
  const esperado = ordem.split(',').map((item) => item.trim());
  sortablePage.shouldHaveOrder(esperado);
});
