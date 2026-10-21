import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import webTablesPage from '../../pages/WebTablesPage';
import { buildWebTableRecord } from '../../utils/dataFactory';

let record;

When('eu crio um novo registro na tabela', () => {
  record = buildWebTableRecord();
  webTablesPage.addRecord(record);
});

Then('o novo registro deve ser exibido na tabela', () => {
  webTablesPage.shouldShowRecord(record);
});

When('eu edito o registro criado', () => {
  const currentEmail = record.email;
  // Mantém o mesmo e-mail (identificador) e troca os demais dados
  record = { ...buildWebTableRecord(), email: currentEmail };
  webTablesPage.editRecord(currentEmail, record);
});

Then('a tabela deve exibir os dados editados', () => {
  webTablesPage.shouldShowRecord(record);
});

When('eu deleto o registro criado', () => {
  webTablesPage.deleteRecord(record.email);
});

Then('o registro não deve mais ser exibido na tabela', () => {
  webTablesPage.shouldNotShowRecord(record.email);
});

// ---------- Bônus: criação dinâmica de vários registros via tabela do Cucumber ----------
let createdRecords = [];

When('eu crio os seguintes registros na tabela:', (dataTable) => {
  // hashes() transforma a tabela do Gherkin em uma lista de objetos { firstName, lastName, ... }
  createdRecords = dataTable.hashes();

  // Com 3 registros iniciais + 12 novos, a tabela passa de 10 linhas (1 página).
  // Por isso as validações usam o campo de busca para localizar cada registro.

  createdRecords.forEach((newRecord) => webTablesPage.addRecord(newRecord));
});

Then('os {int} registros criados devem ser exibidos na tabela', (quantidade) => {
  expect(createdRecords).to.have.length(quantidade);
  createdRecords.forEach((createdRecord) => webTablesPage.shouldShowRecord(createdRecord));
});

When('eu deleto todos os registros criados', () => {
  createdRecords.forEach((createdRecord) => webTablesPage.deleteRecordIfPresent(createdRecord.email));
});

Then('nenhum dos registros criados deve ser exibido na tabela', () => {
  createdRecords.forEach((createdRecord) => webTablesPage.shouldNotShowRecord(createdRecord.email));
});
