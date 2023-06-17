import { onAuthStateChanged, updateProfile } from 'firebase/auth';
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

    it.only('login flow', () => {
      const unsub = onAuthStateChanged(auth, (user) => {
        if (user === null) return;

        updateProfile(user, {
          displayName: '',
        });

        unsub();
      });

      cy.logout();

      cy.login();

      cy.callFirestore('delete', 'users');

      cy.visit('/');

      cy.window().then((win) => {
        const user = auth.currentUser;

        if (user === null) throw 'user is null';

        cy.stub(win.auth, 'signInWithPopup').resolves({ user });

        getButton().click();

        cy.url({ timeout: 15_000 /* milliseconds */ }).should(
          'include',
          '/conversas'
        );

        cy.getBySel('copy username button').focus();

        cy.getBySel('copy username tooltip')
          .invoke('text')
          .should((text) => {
            const splitted = text.split(' ');
            const last = splitted[splitted.length - 1];

            expect(last).to.eq('Usuário#1');
          });

        cy.getBySel('sign out').click();

        cy.url().should('eq', Cypress.config().baseUrl);

        cy.logout();

        const unsub = onAuthStateChanged(auth, (user) => {
          if (user === null) return;

          updateProfile(user, {
            displayName: 'withName',
          });

          unsub();
        });

        cy.login();

        getButton().click();

        cy.url({ timeout: 15_000 /* milliseconds */ }).should(
          'include',
          '/conversas'
        );

        cy.getBySel('copy username button').focus();

        cy.getBySel('copy username tooltip')
          .invoke('text')
          .should((text) => {
            const splitted = text.split(' ');
            const last = splitted[splitted.length - 1];

            expect(last).to.eq('withName#2');
          });

        // const unsub = onAuthStateChanged(auth, (user) => {
        //   if (user === null) return;

        //   updateProfile(user, {
        //     displayName: 'withName',
        //   });

        //   unsub();
        // });

        // cy.login();

        // cy.wait(5000);

        // getButton().click();

        // cy.url({ timeout: 15_000 /* milliseconds */ }).should(
        //   'include',
        //   '/conversas'
        // );

        // cy.getBySel('copy username button').focus();

        // cy.getBySel('copy username tooltip')
        //   .invoke('text')
        //   .should((text) => {
        //     const splitted = text.split(' ');
        //     const last = splitted[splitted.length - 1];

        //     expect(last).to.eq('withName#2');
        //   });
      });
    });
  });
});
