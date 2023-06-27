import { Form } from '.';
import { testInvalidEmail } from '../../../../cypress/utils/testInvalidEmail';

describe('Registration form', () => {
  beforeEach(() => {
    cy.mount(<Form />);
  });

  it('should show error messages if inputs are empty', () => {
    cy.getBySel('submit').click();

    const messages = [
      'Nome obrigatório',
      'E-mail obrigatório',
      'Senha obrigatória',
    ];

    for (const message of messages) {
      cy.contains(message);
    }

    cy.getBySel('name').type('name');
    cy.getBySel('email').type('email');
    cy.getBySel('password').type('password{enter}');

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

  it('should show an error message if passwords are different', () => {
    cy.getBySel('password').type('123456');
    cy.getBySel('password_confirmation').as('confirm').type('different{enter}');

    const message = 'ser iguais';

    cy.contains(message);

    cy.get('@confirm').clear();
    cy.get('@confirm').type('123456{enter}');

    cy.contains(message).should('not.exist');
  });
});
