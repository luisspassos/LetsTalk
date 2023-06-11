import { auth } from '../../../src/services/firebase';

function getElement(element: string) {
  return `[data-testid="${element}"]`;
}

describe('Login page', () => {
  describe('sign in with google', () => {
    function getButton() {
      return cy.get(getElement('google login button'));
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

          const user = auth.currentUser;

          cy.stub(win.auth, 'signInWithPopup').resolves({ user });
        }

        returnsANewUser();

        getButton().click();

        cy.url({ timeout: 10_000 /* milliseconds */ }).should(
          'include',
          '/conversas'
        );

        const user = auth.currentUser;

        // if (user?.displayName === undefined || user.displayName === null) {
        throw 'username has not been set';
        // }
      });
    });
  });
});
