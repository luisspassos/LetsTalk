describe('Login page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should sign in with google', () => {
    cy.get('[data-cy="google login button"]').click();
  });

  // it('sign up button should redirect to sign up page', () => {
  //   cy.contains('Cadastre-se').click();

  //   cy.get('button').contains('CADASTRAR');
  // });

  // it('forgot my password should redirect to forgot my password page', () => {
  //   cy.contains('Esqueci minha senha').click();

  //   cy.get('h1').contains('Envie seu email para recuperar sua senha');
  // });
});
