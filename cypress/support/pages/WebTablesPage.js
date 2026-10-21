import BasePage from './BasePage';

/**
 * Page Object da tela "Web Tables" (/webtables).
 * Um registro é identificado pelo e-mail, que é único.
 */
class WebTablesPage extends BasePage {
  elements = {
    addButton: () => cy.get('#addNewRecordButton'),
    searchBox: () => cy.get('#searchBox'),
    tableRows: () => cy.get('table tbody tr'),
    rowByEmail: (email) => cy.contains('table tbody tr', email),
    // Formulário (modal) de cadastro/edição
    form: {
      modal: () => cy.get('.modal-content'),
      firstName: () => cy.get('#firstName'),
      lastName: () => cy.get('#lastName'),
      email: () => cy.get('#userEmail'),
      age: () => cy.get('#age'),
      salary: () => cy.get('#salary'),
      department: () => cy.get('#department'),
      submit: () => cy.get('#submit'),
    },
  };

  /**
   * Filtra a tabela pelo campo de busca.
   * Assim encontramos o registro mesmo quando há mais linhas do que cabem em uma página.
   */
  searchFor(text) {
    this.elements.searchBox().clear().type(text);
  }

  clearSearch() {
    this.elements.searchBox().clear();
  }

  openNewRecordForm() {
    this.elements.addButton().click();
    this.elements.form.modal().should('be.visible');
  }

  /** Preenche o formulário (limpando os campos antes) e envia. */
  fillAndSubmitForm(record) {
    const { form } = this.elements;
    form.firstName().clear().type(record.firstName);
    form.lastName().clear().type(record.lastName);
    form.email().clear().type(record.email);
    form.age().clear().type(String(record.age));
    form.salary().clear().type(String(record.salary));
    form.department().clear().type(record.department);
    form.submit().click();
    form.modal().should('not.exist');
  }

  addRecord(record) {
    this.openNewRecordForm();
    this.fillAndSubmitForm(record);
  }

  editRecord(currentEmail, newData) {
    this.elements.rowByEmail(currentEmail).find('[title="Edit"]').click();
    this.elements.form.modal().should('be.visible');
    this.fillAndSubmitForm(newData);
  }

  deleteRecord(email) {
    this.searchFor(email);
    this.elements.rowByEmail(email).find('[title="Delete"]').click();
    this.clearSearch();
  }

  /**
   * Deleta o registro apenas se ele ainda estiver na tabela.
   */
  deleteRecordIfPresent(email) {
    this.searchFor(email);
    cy.get('table tbody').then(($tbody) => {
      if ($tbody.text().includes(email)) {
        this.elements.rowByEmail(email).find('[title="Delete"]').click();
      } else {
        cy.log(`Registro ${email} já não estava na tabela.`);
      }
    });
    this.clearSearch();
  }

  /** Confere que a linha do registro existe e mostra todos os valores, na ordem das colunas. */
  shouldShowRecord(record) {
    this.searchFor(record.email);
    this.elements
      .rowByEmail(record.email)
      .find('td')
      .then(($cells) => {
        const values = [...$cells].slice(0, 6).map((cell) => cell.innerText.trim());
        expect(values).to.deep.eq([
          record.firstName,
          record.lastName,
          String(record.age),
          record.email,
          String(record.salary),
          record.department,
        ]);
      });
    this.clearSearch();
  }

  shouldNotShowRecord(email) {
    this.searchFor(email);
    cy.get('table tbody').should('not.contain', email);
    this.clearSearch();
  }
}

export default new WebTablesPage();
