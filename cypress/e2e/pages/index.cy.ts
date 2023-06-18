import { onAuthStateChanged, updateProfile, User } from 'firebase/auth';
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
      type CypressPromiseParams = Parameters<
        ConstructorParameters<typeof Cypress.Promise>[0]
      >;

      type UserAllReadyCallback = (
        user: User,
        ...promiseParams: CypressPromiseParams
      ) => void;

      function login(userAllReadyCallback?: UserAllReadyCallback) {
        cy.logout();

        cy.login().then(() => {
          return new Cypress.Promise((...promiseParams) => {
            const unsub = onAuthStateChanged(auth, (user) => {
              if (user === null) return;

              const [resolve] = promiseParams;

              userAllReadyCallback
                ? userAllReadyCallback(user, ...promiseParams)
                : resolve();

              unsub();
            });
          });
        });
      }

      function verifyIfUserHasBeenAuthenticated() {
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
      }

      login((user, resolve, reject) => {
        updateProfile(user, {
          displayName: '',
        })
          .then(resolve)
          .catch(reject);
      });

      cy.callFirestore('delete', 'users');

      cy.visit('/');

      cy.window().then((win) => {
        const user = auth.currentUser;

        if (user === null) throw 'user is null';

        cy.stub(win.auth, 'signInWithPopup').resolves({ user });

        verifyIfUserHasBeenAuthenticated();

        cy.getBySel('sign out').click();

        login();

        // verify if it doesn't recreate the user already created
        verifyIfUserHasBeenAuthenticated();
      });
    });
  });
});
