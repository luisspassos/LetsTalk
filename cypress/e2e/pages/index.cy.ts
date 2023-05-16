describe('Login page', () => {
  it('should render the components', () => {
    cy.visit('/');

    cy.contains("Let's Talk");

    cy.contains('Entrar com o Google');

    cy.contains('Email').siblings('input');

    cy.contains('Senha').siblings('input');

    cy.contains('Esqueci minha senha');

    cy.contains('Entrar');

    cy.contains('Cadastre-se');
  });
});
