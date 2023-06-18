import { auth } from 'services/firebase';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';

describe('Login button with Google', () => {
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

  function loginUser(name = '') {
    cy.logout();

    cy.login().then(() => {
      return new Cypress.Promise(async (resolve, reject) => {
        const unsub = onAuthStateChanged(auth, (user) => {
          if (user === null) return;

          updateProfile(user, {
            displayName: name,
          })
            .then(resolve)
            .catch(reject);

          unsub();
        });
      });
    });

    cy.callFirestore('delete', 'users');
  }

  function verifyIfUserHasBeenAuthenticated(
    username: string,
    userId: number | string
  ) {
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
        .should((text: string) => {
          const isLoggedIn = text.endsWith(`${username}#${userId}`);

          expect(isLoggedIn).to.eq(true);
        });
    });
  }

  it('should sign in with a new user with default name', () => {
    const name = 'default user';

    loginUser(name);

    verifyIfUserHasBeenAuthenticated(name, 1);
  });

  it('should sign in with a new user without default name and check if it has a new id', () => {
    loginUser();

    cy.callFirestore('set', 'users/current_user_id', {
      id: 1,
    });

    verifyIfUserHasBeenAuthenticated('Usuário', 2);
  });

  it('should not re-register a user', () => {
    const user = 'user#1';

    loginUser(user);

    cy.callFirestore('set', `users/${user}`, {
      data: 'fake',
    });

    const [username, userId] = user.split('#');

    verifyIfUserHasBeenAuthenticated(username, userId);
  });
});
