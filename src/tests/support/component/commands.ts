/// <reference types="cypress" />

import { emailMessage } from 'components/Form/Input/Inputs/Email';
import { passwordMessage } from 'components/Form/Input/Inputs/Password';

Cypress.Commands.add('testEmailEmpty', () => {
  cy.contains(emailMessage.required);

  cy.getBySel('email').type('email{enter}');

  cy.contains(emailMessage.required).should('not.exist');
});

Cypress.Commands.add('testPasswordEmpty', () => {
  cy.contains(passwordMessage.required);

  cy.getBySel('password').type('password{enter}');

  cy.contains(passwordMessage.required).should('not.exist');
});
