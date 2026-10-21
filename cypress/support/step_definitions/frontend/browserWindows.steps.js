import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import browserWindowsPage from '../../pages/BrowserWindowsPage';

When('clico no botão "New Window"', () => {
  browserWindowsPage.stubWindowOpen();
  browserWindowsPage.clickNewWindow();
});

Then('uma nova janela deve ser aberta com a mensagem {string}', (message) => {
  browserWindowsPage.getOpenedWindowUrl().then((url) => {
    expect(url).to.contain('/sample');
    browserWindowsPage.openWindowUrl(url);
  });
  browserWindowsPage.shouldShowSampleMessage(message);
});

Then('fecho a nova janela aberta', () => {
  browserWindowsPage.closeNewWindow();
});
