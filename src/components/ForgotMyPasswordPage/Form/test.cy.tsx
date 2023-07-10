import { testUnknownError } from 'tests/utils/error/unknownError/test';
import { errorMessage, Form } from '.';

describe('Forgot my password form', () => {
  beforeEach(() => {
    cy.mount(<Form />);
  });

  it('should show error messages if inputs are empty', () => {
    cy.getBySel('submit').click();

    cy.testEmailEmpty();
  });

  it('should show an error if user not found', () => {
    cy.getBySel('email').type('userNotFound@email.com{enter}');

    cy.contains(errorMessage.userNotFound);
  });

  testUnknownError({
    funcToBeStubbed: ['auth', 'sendEmailToRecoverPassword'],
    submitForm: () => {
      cy.getBySel('email').type(Cypress.env('email') + '{enter}');
    },
  });
});
