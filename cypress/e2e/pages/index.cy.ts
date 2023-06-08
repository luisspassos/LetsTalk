import * as getValueMod from '../../../src/components/LoginPage/Form/LoginButtonWithGoogle/getValue';

describe('Login page', () => {
  it('a', () => {
    cy.stub(getValueMod, 'getValue').returns('Hiiii');
    cy.visit('/');
    cy.get('[data-cy="google login button"]').click();

    // cy.stub(getValue, 'getValue').returns('Hi');
    // cy.login('Cu5c1zjAschlRhzO6mUzPRbfUwv2');
    // cy.visit('/');
    // cy.get('[data-cy="google login button"]').click();
  });
});
