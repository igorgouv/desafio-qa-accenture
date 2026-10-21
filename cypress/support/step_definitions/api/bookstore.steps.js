import { Given, When, Then, After } from '@badeball/cypress-cucumber-preprocessor';
import bookStore from '../../api/BookStoreService';
import { buildApiUser } from '../../utils/dataFactory';

// Guarda os dados que passam de um step para o outro (usuário, token, livros...)
const ctx = {};

Given('que eu crio um novo usuário com dados válidos', () => {
  ctx.user = buildApiUser();

  bookStore.createUser(ctx.user.userName, ctx.user.password).then((response) => {
    expect(response.status).to.eq(201);
    expect(response.body).to.have.property('userID').and.not.be.empty;
    expect(response.body.username).to.eq(ctx.user.userName);
    expect(response.body.books).to.be.an('array').that.is.empty;

    ctx.userId = response.body.userID;
  });
});

When('eu gero um token de acesso para esse usuário', () => {
  bookStore.generateToken(ctx.user.userName, ctx.user.password).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.status).to.eq('Success');
    expect(response.body.result).to.eq('User authorized successfully.');
    expect(response.body.token).to.be.a('string').and.not.be.empty;

    ctx.token = response.body.token;
  });
});

Then('o usuário deve estar autorizado', () => {
  bookStore.isAuthorized(ctx.user.userName, ctx.user.password).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.eq(true);
  });
});

When('eu listo os livros disponíveis na loja', () => {
  bookStore.listBooks().then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.books).to.be.an('array').and.have.length.greaterThan(1);

    // Todo livro precisa ter, pelo menos, ISBN e título
    response.body.books.forEach((book) => {
      expect(book).to.include.all.keys('isbn', 'title', 'author');
    });

    ctx.availableBooks = response.body.books;
    cy.log(`Livros disponíveis: ${ctx.availableBooks.length}`);
  });
});

When('eu alugo {int} livros de livre escolha', (quantidade) => {
  // Escolhe livros aleatórios da lista, sem repetir
  const shuffled = Cypress._.shuffle(ctx.availableBooks);
  ctx.rentedBooks = shuffled.slice(0, quantidade);
  const isbns = ctx.rentedBooks.map((book) => book.isbn);

  bookStore.addBooksToUser(ctx.userId, isbns, ctx.token).then((response) => {
    expect(response.status).to.eq(201);
    const returnedIsbns = response.body.books.map((book) => book.isbn);
    expect(returnedIsbns).to.have.members(isbns);
  });
});

Then('os detalhes do usuário devem listar os {int} livros alugados', (quantidade) => {
  bookStore.getUser(ctx.userId, ctx.token).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.userId).to.eq(ctx.userId);
    expect(response.body.username).to.eq(ctx.user.userName);
    expect(response.body.books).to.have.length(quantidade);

    const titulosRetornados = response.body.books.map((book) => book.title);
    const titulosAlugados = ctx.rentedBooks.map((book) => book.title);
    expect(titulosRetornados).to.have.members(titulosAlugados);

    cy.log(`Livros do usuário: ${titulosRetornados.join(' | ')}`);
  });
});

// Hook do Cucumber: roda depois de cada cenário com a tag @api
// Apaga o usuário criado para não deixar "lixo" na base do DemoQA
After({ tags: '@api' }, () => {
  if (ctx.userId && ctx.token) {
    bookStore.deleteUser(ctx.userId, ctx.token).its('status').should('eq', 204);
  }
});
