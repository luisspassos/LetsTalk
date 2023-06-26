export function testInvalidEmail() {
  it('should show an error message if email is not valid', () => {
    cy.getBySel('email').type('email{enter}');

    cy.contains('E-mail inválido');
  });
}
