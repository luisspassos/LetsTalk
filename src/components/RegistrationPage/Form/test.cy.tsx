import { Form } from '.';
import { testInvalidEmail } from '../../../../cypress/utils/testInvalidEmail';

describe('Registration form', () => {
  beforeEach(() => {
    cy.mount(<Form />);
  });

  it('should show error messages if inputs are empty', () => {
    cy.getBySel('submit').click();

    cy.contains('Nome obrigatório');
    cy.contains('E-mail obrigatório');
    cy.contains('Senha obrigatória');
  });

  it.only('should show error messages if name has #', () => {
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

    cy.contains('mínimo 6 caracteres');
  });

  it('should show an error message if passwords are different', () => {
    cy.getBySel('password').type('123456');
    cy.getBySel('password_confirmation').type('different{enter}');

    cy.contains('ser iguais');
  });
});
