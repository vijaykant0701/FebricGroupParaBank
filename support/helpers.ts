import { faker } from '@faker-js/faker';

export function generateRandomUsername(): string {
  return `user_${faker.string.alphanumeric(8)}}`;
}

export function generateRandomPassword(): string {
  return faker.internet.password({
    length: 12,
    pattern: /[\w\d]/,
    prefix: '!Aa1' // Ensures complexity requirements
  });
}