import { errorMessage, Form } from '.';
import { testInvalidEmail } from 'tests/utils/testInvalidEmail';
import { testUnknownError } from 'tests/utils/error/unknownError/test';

describe('Login form', () => {
  beforeEach(() => {
    cy.mount(<Form />);
  });

  it('should show error messages if inputs are empty', () => {
    cy.getBySel('submit').click();

    cy.testEmailEmpty();
    cy.testPasswordEmpty();
  });

  it('should show an error if user not found', () => {
    cy.getBySel('email').type('userNotFound@email.com');
    cy.getBySel('password').type('123456{enter}');

    cy.contains(errorMessage.userNotFound);
  });

  it('should show an error if password is incorrect', () => {
    cy.getBySel('email').type(Cypress.env('email'));
    cy.getBySel('password').type('wrongPassword{enter}');

    cy.contains(errorMessage.wrongPassword);
  });

  testInvalidEmail();

  testUnknownError({
    funcToBeStubbed: ['auth', 'signInWithEmailAndPassword'],
    submitForm: () => {
      cy.getBySel('email').type(Cypress.env('email'));
      cy.getBySel('password').type(Cypress.env('password') + '{enter}');
    },
  });
});
