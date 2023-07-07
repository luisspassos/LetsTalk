import { errorMessage, Form } from '.';
import { testInvalidEmail } from '../../../../cypress/utils/testInvalidEmail';

describe('Login form', () => {
  beforeEach(() => {
    cy.mount(<Form />);
  });

  it('should show error messages if inputs are empty', () => {
    cy.getBySel('submit').click();

    cy.testEmailEmpty();
    cy.testPasswordEmpty();
  });

  testInvalidEmail();

  it('should show an error if user not found', () => {
    cy.getBySel('email').type('userNotFound@email.com');
    cy.getBySel('password').type('123456{enter}');

    cy.contains(errorMessage.userNotFound);
  });

  it('should show an error if password is incorrect', () => {
    cy.getBySel('email').type(Cypress.env('email'));
    cy.getBySel('password').type('wrongPassword{enter}');

    cy.contains(errorMessage.wrongPassword);
  });

  it.only('should show an unknown error', () => {
    cy.window().then((win) => {
      cy.stub(win.auth, 'signInWithEmailAndPassword').callsFake(() => {
        throw 'err';
      });

      cy.getBySel('email').type(Cypress.env('email'));
      cy.getBySel('password').type(Cypress.env('password') + '{enter}');

      cy.get('div[id="unknown error"]').should('be.visible');
    });
  });
});
