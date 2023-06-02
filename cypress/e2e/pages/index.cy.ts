describe('Login page', () => {
  // beforeEach(() => {
  //   cy.visit('/');
  // });

  it('should open google sign in popup', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win, 'open');
      },
    });

    cy.get('[data-cy="google login button"]').click();

    cy.window().its('open').should('be.called');
  });
});
