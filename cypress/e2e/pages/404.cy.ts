describe('404 Page', () => {
  it('should go to the login page when clicking the back link', () => {
    cy.visit('/404', { failOnStatusCode: false });

    cy.contains('Voltar').click();

    cy.contains('Entrar com o Google');
  });
});

export {};
