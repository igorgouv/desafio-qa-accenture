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

// Estados e cidades aceitos pelo formulário do DemoQA
const STATES_AND_CITIES = {
  NCR: ['Delhi', 'Gurgaon', 'Noida'],
  'Uttar Pradesh': ['Agra', 'Lucknow', 'Merrut'],
  Haryana: ['Karnal', 'Panipat'],
  Rajasthan: ['Jaipur', 'Jaiselmer'],
};

/** Gera um estudante aleatório para preencher o Practice Form. */
export function buildStudent() {
  const state = faker.helpers.objectKey(STATES_AND_CITIES);
  const birthDate = faker.date.birthdate({ min: 18, max: 45, mode: 'age' });

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email().toLowerCase(),
    gender: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
    mobile: faker.string.numeric({ length: 10, allowLeadingZeros: false }),
    // Formato aceito pelo datepicker: "15 Mar 1995"
    dateOfBirth: birthDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    // Formato exibido no popup de confirmação: "15 March,1995"
    dateOfBirthConfirmation: `${String(birthDate.getDate()).padStart(2, '0')} ${birthDate.toLocaleDateString('en-GB', { month: 'long' })},${birthDate.getFullYear()}`,
    subjects: faker.helpers.arrayElements(['Maths', 'English', 'Physics', 'Chemistry', 'Computer Science'], 2),
    hobbies: faker.helpers.arrayElements(['Sports', 'Reading', 'Music'], { min: 1, max: 3 }),
    address: faker.location.streetAddress({ useFullAddress: true }),
    state,
    city: faker.helpers.arrayElement(STATES_AND_CITIES[state]),
  };
}

/** Gera um registro aleatório para a tabela do Web Tables. */
export function buildWebTableRecord() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  return {
    firstName,
    lastName,
    email: faker.internet.email({ firstName, lastName, provider: 'qa-accenture.com' }).toLowerCase(),
    age: faker.number.int({ min: 18, max: 65 }),
    salary: faker.number.int({ min: 2000, max: 20000 }),
    department: faker.helpers.arrayElement(['QA', 'Engineering', 'Legal', 'Insurance', 'Compliance']),
  };
}
