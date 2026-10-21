/**
 * Service Object da API do DemoQA (Account + BookStore).
 * Cada método representa um endpoint e devolve a resposta do cy.request,
 * para que os steps do Cucumber façam as validações.
 */
class BookStoreService {
  /**
   * POST /Account/v1/User — cria um novo usuário.
   * failOnStatusCode: false => o Cypress não quebra sozinho se vier 4xx/5xx;
   * quem valida o status é o step.
   */
  createUser(userName, password) {
    return cy.request({
      method: 'POST',
      url: '/Account/v1/User',
      body: { userName, password },
      failOnStatusCode: false,
    });
  }

  /** POST /Account/v1/GenerateToken — gera o token JWT do usuário. */
  generateToken(userName, password) {
    return cy.request({
      method: 'POST',
      url: '/Account/v1/GenerateToken',
      body: { userName, password },
      failOnStatusCode: false,
    });
  }

  /** POST /Account/v1/Authorized — confirma se o usuário está autorizado (retorna true/false). */
  isAuthorized(userName, password) {
    return cy.request({
      method: 'POST',
      url: '/Account/v1/Authorized',
      body: { userName, password },
      failOnStatusCode: false,
    });
  }

  /** GET /BookStore/v1/Books — lista os livros disponíveis (endpoint público). */
  listBooks() {
    return cy.request({
      method: 'GET',
      url: '/BookStore/v1/Books',
      failOnStatusCode: false,
    });
  }

  /**
   * POST /BookStore/v1/Books — "aluga" (adiciona à coleção do usuário) uma lista de livros.
   * Precisa do token no cabeçalho Authorization (Bearer).
   */
  addBooksToUser(userId, isbns, token) {
    return cy.request({
      method: 'POST',
      url: '/BookStore/v1/Books',
      headers: { Authorization: `Bearer ${token}` },
      body: {
        userId,
        collectionOfIsbns: isbns.map((isbn) => ({ isbn })),
      },
      failOnStatusCode: false,
    });
  }

  /** GET /Account/v1/User/{userId} — detalhes do usuário, incluindo os livros alugados. */
  getUser(userId, token) {
    return cy.request({
      method: 'GET',
      url: `/Account/v1/User/${userId}`,
      headers: { Authorization: `Bearer ${token}` },
      failOnStatusCode: false,
    });
  }

  /** DELETE /Account/v1/User/{userId} — remove o usuário (limpeza da massa de teste). */
  deleteUser(userId, token) {
    return cy.request({
      method: 'DELETE',
      url: `/Account/v1/User/${userId}`,
      headers: { Authorization: `Bearer ${token}` },
      failOnStatusCode: false,
    });
  }
}

export default new BookStoreService();
