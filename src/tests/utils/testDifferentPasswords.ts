/**
 * Test if password is different from the password confirmation
 */

export function testDifferentPasswords() {
  it('should show an error message if passwords are different', () => {
    cy.getBySel('password').type('123456');
    cy.getBySel('password_confirmation').as('confirm').type('different{enter}');

    const message = 'ser iguais';

    cy.contains(message);

    cy.get('@confirm').clear();
    cy.get('@confirm').type('123456{enter}');

    cy.contains(message).should('not.exist');
  });
}
