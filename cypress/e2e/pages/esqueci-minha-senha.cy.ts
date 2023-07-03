describe('Forgot my password page', () => {
  describe('links', () => {
    beforeEach(() => {
      cy.visit('/esqueci-minha-senha');
    });

    it('login', () => {
      cy.testLink('login');
    });
  });
});

export {};
