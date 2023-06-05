describe('Login page', () => {
  it('a', () => {
    cy.login('Cu5c1zjAschlRhzO6mUzPRbfUwv2');
    cy.visit('/');
    cy.get('[data-cy="google login button"]').click();
  });
});
