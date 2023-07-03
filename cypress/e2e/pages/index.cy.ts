describe('Login page', () => {
  describe('links', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('forgot my password', () => {
      cy.testLink('forgot password');
    });

    it('registration', () => {
      cy.testLink('registration');
    });
  });
});
