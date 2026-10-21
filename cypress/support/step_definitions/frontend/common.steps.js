import { Given, When } from '@badeball/cypress-cucumber-preprocessor';
import BasePage from '../../pages/BasePage';

// Steps de navegação compartilhados por todos os fluxos de frontend
const page = new BasePage();

Given('que eu acesso o site DemoQA', () => {
  page.visitHome();
});

When('eu escolho a opção {string} na página inicial', (cardName) => {
  page.chooseHomeCard(cardName);
});

When('clico no submenu {string}', (submenuName) => {
  page.clickSubmenu(submenuName);
  page.shouldHaveTitle(submenuName);
});
