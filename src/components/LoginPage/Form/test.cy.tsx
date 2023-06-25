import { Form } from '.';

describe('Login form', () => {
  beforeEach(() => {
    cy.mount(<Form />);
  });

  it('should show error messages if inputs are empty', () => {
    cy.getBySel('submit').click();

    cy.contains('E-mail obrigatório');
    cy.contains('Senha obrigatória');
  });

  it('should show an error message if email is not valid', () => {
    cy.getBySel('email').type('email{enter}');

    cy.contains('E-mail inválido');
  });
});
