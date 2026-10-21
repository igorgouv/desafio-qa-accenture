import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import progressBarPage from '../../pages/ProgressBarPage';

When('clico no botão Start da barra de progresso', () => {
  progressBarPage.clickStart();
});

When('paro a barra de progresso antes dos {int}%', (limite) => {
  // Margem de segurança de 10%: clicamos em Stop quando a barra passa de 15%,
  // bem antes do limite de 25%, para compensar o tempo do clique.
  progressBarPage.stopWhenReaches(limite - 10);
});

Then('o valor da barra de progresso deve ser menor ou igual a {int}%', (limite) => {
  progressBarPage.shouldBeAtMost(limite);
});

When('eu clico em Start novamente e aguardo a barra chegar a 100%', () => {
  progressBarPage.clickStart();
  progressBarPage.waitUntilComplete();
});

Then('eu reseto a barra de progresso', () => {
  progressBarPage.clickReset();
  progressBarPage.shouldBeReset();
});
