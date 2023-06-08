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

    it('should go to the conversations page', () => {
      cy.login('Cu5c1zjAschlRhzO6mUzPRbfUwv2');

      cy.visit('/');

      cy.window().then((win) => {
        onAuthStateChanged(auth, (user) => {
          cy.stub(win.signInWithPopupMod, 'signInWithPopup').resolves({
            user,
          });
        });

        getButton().click();

        cy.get('Conversas').should('be.visible');
      });
    });
  });
});
