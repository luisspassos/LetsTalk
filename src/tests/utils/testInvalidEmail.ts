export function testInvalidEmail() {
  it('should show an error message if email is not valid', () => {
    cy.getBySel('email').type('email{enter}');

    const message = 'E-mail inválido';

    cy.contains(message);

    cy.getBySel('email').type('email@example.com{enter}');

    cy.contains(message).should('not.exist');
  });
}
