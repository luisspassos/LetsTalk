describe('Registration page', () => {
  describe('links', () => {
    beforeEach(() => {
      cy.visit('/cadastro');
    });

    it('login', () => {
      cy.testLink('login');
    });
  });
});
