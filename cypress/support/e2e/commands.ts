/// <reference types="cypress" />

Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-testid="${selector}"]`, ...args);
});

Cypress.Commands.add('testLink', (link) => {
  cy.getBySel(link + ' link')
    .filter(':visible')
    .click();

  cy.getBySel(link + ' page').should('be.visible');
});
