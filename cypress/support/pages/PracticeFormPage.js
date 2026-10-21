import BasePage from './BasePage';

/**
 * Page Object do formulário "Practice Form" (/automation-practice-form).
 * Guarda os seletores em um só lugar: se a tela mudar, só este arquivo muda.
 */
class PracticeFormPage extends BasePage {
  elements = {
    firstName: () => cy.get('#firstName'),
    lastName: () => cy.get('#lastName'),
    email: () => cy.get('#userEmail'),
    gender: (gender) => cy.contains('#genterWrapper label', gender),
    mobile: () => cy.get('#userNumber'),
    dateOfBirth: () => cy.get('#dateOfBirthInput'),
    subjects: () => cy.get('#subjectsInput'),
    hobby: (hobby) => cy.contains('#hobbiesWrapper label', hobby),
    uploadPicture: () => cy.get('#uploadPicture'),
    address: () => cy.get('#currentAddress'),
    state: () => cy.get('#state input'),
    city: () => cy.get('#city input'),
    submitButton: () => cy.get('#submit'),
    modal: () => cy.get('.modal-content'),
    modalTitle: () => cy.get('#example-modal-sizes-title-lg'),
    modalValue: (label) => cy.contains('.modal-content td', label).next('td'),
    closeModalButton: () => cy.get('#closeLargeModal'),
  };

  fillForm(student) {
    this.elements.firstName().type(student.firstName);
    this.elements.lastName().type(student.lastName);
    this.elements.email().type(student.email);
    this.elements.gender(student.gender).click();
    this.elements.mobile().type(student.mobile);
    this.fillDateOfBirth(student.dateOfBirth);
    student.subjects.forEach((subject) => this.selectAutocomplete(this.elements.subjects, subject));
    student.hobbies.forEach((hobby) => this.elements.hobby(hobby).click());
    this.elements.address().type(student.address);
    this.selectAutocomplete(this.elements.state, student.state);
    this.selectAutocomplete(this.elements.city, student.city);
  }

  /** O campo de data é um datepicker: selecionamos o texto todo e digitamos a nova data. */
  fillDateOfBirth(date) {
    this.elements.dateOfBirth().click().type('{selectall}').type(`${date}{enter}`);
  }

  /** Campos "react-select": digita o valor e confirma com Enter. */
  selectAutocomplete(getField, value) {
    getField().type(value, { force: true }).type('{enter}', { force: true });
  }

  uploadFile(filePath) {
    this.elements.uploadPicture().selectFile(filePath);
  }

  submit() {
    this.elements.submitButton().scrollIntoView().click({ force: true });
  }

  shouldShowConfirmationModal(student, fileName) {
    this.elements.modal().should('be.visible');
    this.elements.modalTitle().should('have.text', 'Thanks for submitting the form');

    this.elements.modalValue('Student Name').should('have.text', `${student.firstName} ${student.lastName}`);
    this.elements.modalValue('Student Email').should('have.text', student.email);
    this.elements.modalValue('Gender').should('have.text', student.gender);
    this.elements.modalValue('Mobile').should('have.text', student.mobile);
    this.elements.modalValue('Date of Birth').should('have.text', student.dateOfBirthConfirmation);
    this.elements.modalValue('Subjects').should('have.text', student.subjects.join(', '));
    this.elements.modalValue('Hobbies').should('have.text', student.hobbies.join(', '));
    this.elements.modalValue('Picture').should('have.text', fileName);
    this.elements.modalValue('Address').should('have.text', student.address);
    this.elements.modalValue('State and City').should('have.text', `${student.state} ${student.city}`);
  }

  /**
   * Fecha o popup.
   * Observação: hoje o botão "Close" do DemoQA lança um erro de JavaScript do próprio site
   * (TypeError: findDOMNode is not a function) e o modal não fecha pelo clique.
   * Por isso, depois do clique também enviamos a tecla ESC, que fecha o modal pelo
   * comportamento padrão do Bootstrap. Se o site for corrigido, o ESC não atrapalha.
   */
  closeModal() {
    this.elements.closeModalButton().click({ force: true });
    cy.get('body').type('{esc}');
    this.elements.modal().should('not.exist');
  }
}

export default new PracticeFormPage();
