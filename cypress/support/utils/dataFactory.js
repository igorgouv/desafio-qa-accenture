import { faker } from '@faker-js/faker';

/**
 * Gera um usuário aleatório para a API.
 * A senha do DemoQA exige: 8+ caracteres, letra maiúscula, minúscula, número e caractere especial.
 */
export function buildApiUser() {
  return {
    userName: `qa_${faker.internet.username().replace(/[^a-zA-Z0-9]/g, '')}_${Date.now()}`,
    password: `Qa@${faker.string.alphanumeric(6)}1a`,
  };
}
