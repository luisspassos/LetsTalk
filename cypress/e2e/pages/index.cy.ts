describe('Login page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('sign up button should redirect to sign up page', () => {
    cy.contains('Cadastre-se').click();

    cy.get('button').contains('CADASTRAR');
  });

  it('forgot my password should redirect to forgot my password page', () => {
    cy.contains('Esqueci minha senha').click();

    cy.get('h1').contains('Envie seu email para recuperar sua senha');
  });

  it('should sign in with google', () => {
    cy.contains('Entrar com o Google').click();

    cy.get('input').type('luis@gmail.com');
  });
});
