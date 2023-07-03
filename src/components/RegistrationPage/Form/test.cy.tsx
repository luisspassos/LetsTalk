import { Form } from '.';
import { testDifferentPasswords } from '../../../../cypress/utils/testDifferentPasswords';
import { testInvalidEmail } from '../../../../cypress/utils/testInvalidEmail';

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
});