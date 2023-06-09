import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../src/services/firebase';

describe('Login page', () => {
  describe('sign in with google', () => {
    function getButton() {
      return cy.get('[data-testid="google login button"]');
    }

    it('should open a login popup', () => {
      cy.visit('/', {
        onBeforeLoad(win) {
          cy.stub(win, 'open');
        },
      });

      getButton().click();

      cy.window().its('open').should('be.called');
    });

    it.only('should go to the conversations page', () => {
      cy.login();

      cy.visit('/');

      cy.window().then((win) => {
        function returnsANewUser() {
          cy.stub(win.auth, 'getAdditionalUserInfo').returns({
            isNewUser: true,
          });

          onAuthStateChanged(auth, (user) => {
            cy.stub(win.auth, 'signInWithPopup').resolves({ user });
          });
        }

        returnsANewUser();

        getButton().click();

        cy.get('Conversas').should('be.visible');
      });
    });
  });
});
