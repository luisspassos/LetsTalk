import { errorMessage, Form } from '.';
import { testDifferentPasswords } from 'tests/utils/testDifferentPasswords';
import { testInvalidEmail } from 'tests/utils/testInvalidEmail';
import { testUnknownError } from 'tests/utils/error/unknownError/test';

describe('Registration form', () => {
  beforeEach(() => {
    cy.mount(<Form />);
  });

  it('should show error messages if inputs are empty', () => {
    cy.getBySel('submit').click();

    cy.testEmailEmpty();
    cy.testPasswordEmpty();

    const messages = ['Nome obrigatório'];

    for (const message of messages) {
      cy.contains(message);
    }

    cy.getBySel('name').type('name');

    for (const message of messages) {
      cy.contains(message).should('not.exist');
    }
  });

  it('should show error messages if name has #', () => {
    const possibilities = ['#', '#example', 'example#example', 'example#'];

    for (const p of possibilities) {
      cy.getBySel('name').clear();
      cy.getBySel('name').type(p + '{enter}');

      cy.contains('não pode conter #');
    }

    cy.getBySel('name').clear();
    cy.getBySel('name').type('test{enter}');

    cy.contains('não pode conter #').should('not.exist');
  });

  testInvalidEmail();

  it('should show an error message if password has less than 6 characters', () => {
    cy.getBySel('password').type('12345{enter}');

    const message = 'mínimo 6 caracteres';

    cy.contains(message);

    cy.getBySel('password').type('123456{enter}');

    cy.contains(message).should('not.exist');
  });

  testDifferentPasswords();

  it('should show an error if email is already in use', () => {
    cy.getBySel('email').type(Cypress.env('email'));
    cy.getBySel('name').type('name');
    cy.getBySel('password').type('123456');
    cy.getBySel('password_confirmation').type('123456{enter}');

    cy.contains(errorMessage.emailAlreadyInUse);
  });

  testUnknownError({
    funcToBeStubbed: ['auth', 'createUserWithEmailAndPassword'],
    submitForm: () => {
      cy.getBySel('email').type(Cypress.env('email'));
      cy.getBySel('name').type('name');
      cy.getBySel('password').type('123456');
      cy.getBySel('password_confirmation').type('123456{enter}');
    },
  });
});
