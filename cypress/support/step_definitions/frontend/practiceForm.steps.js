import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import practiceFormPage from '../../pages/PracticeFormPage';
import { buildStudent } from '../../utils/dataFactory';

let student;
let uploadedFile;

When('preencho todo o formulário com valores aleatórios', () => {
  student = buildStudent();
  cy.log(`Estudante gerado: ${JSON.stringify(student)}`);
  practiceFormPage.fillForm(student);
});

When('faço o upload do arquivo {string}', (fileName) => {
  uploadedFile = fileName;
  practiceFormPage.uploadFile(`cypress/fixtures/uploads/${fileName}`);
});

When('submeto o formulário', () => {
  practiceFormPage.submit();
});

Then('um popup de confirmação deve ser exibido com os dados enviados', () => {
  practiceFormPage.shouldShowConfirmationModal(student, uploadedFile);
});

Then('fecho o popup', () => {
  practiceFormPage.closeModal();
});
