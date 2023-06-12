import { updateProfile } from 'firebase/auth';
import { auth } from 'services/firebase';

describe('Login page', () => {
  describe('sign in with google', () => {
    function getButton() {
      return cy.getBySel('google login button');
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
      cy.login().then(async () => {
        const user = auth.currentUser;

        if (user === null) throw 'there is no user';

        await updateProfile(user, {
          displayName: null,
        });

        console.log(auth.currentUser);
      });
      cy.callFirestore('delete', 'users');

      cy.visit('/');

      cy.window().then((win) => {
        const user = auth.currentUser;

        cy.stub(win.auth, 'signInWithPopup').resolves({ user });

        getButton().click();

        cy.url({ timeout: 10_000 /* milliseconds */ }).should(
          'include',
          '/conversas'
        );

        cy.getBySel('go to settings page button').click();

        cy.getBySel('username').should('have.text', 'Usuário#1');
      });
    });
  });
});
