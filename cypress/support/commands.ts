/// <reference types="cypress" />

Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-testid="${selector}"]`, ...args);
});

Cypress.Commands.add('testInvalidEmail', () => {
  cy.getBySel('email').type('email{enter}');

  cy.contains('E-mail inválido');
});
