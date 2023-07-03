describe('Login page', () => {
  describe('links', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('forgot my password', () => {
      cy.getBySel('forgot password link').click();
    });
  });
});
