describe('404 Page', () => {
  describe('links', () => {
    beforeEach(() => {
      cy.visit('/404', { failOnStatusCode: false });
    });
    it('back to the homepage', () => {
      cy.testLink('login');
    });
  });
});

export {};
