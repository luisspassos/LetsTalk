import { Form } from '.';
import { testInvalidEmail } from '../../../../cypress/utils/testInvalidEmail';

describe('Login form', () => {
  beforeEach(() => {
    cy.mount(<Form />);
  });

  it('should show error messages if inputs are empty', () => {
    cy.getBySel('submit').click();

    const messages = ['E-mail obrigatório', 'Senha obrigatória'];

    for (const message of messages) {
      cy.contains(message);
    }
  });

  testInvalidEmail();
});
