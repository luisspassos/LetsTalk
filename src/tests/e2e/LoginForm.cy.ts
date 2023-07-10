import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth } from 'services/firebase';

describe('Login form', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should login a user', () => {
    cy.logout();
    cy.callFirestore('delete', 'users');

    const username = 'user#1';

    cy.callFirestore('set', `users/${username}`, {
      data: 'fake',
    }).then(() => {
      return new Cypress.Promise((resolve, reject) => {
        const unsub = onAuthStateChanged(auth, (user) => {
          if (user === null) return;

          updateProfile(user, {
            displayName: username,
          })
            .then(resolve)
            .catch(reject);

          unsub();
        });
      });
    });

    cy.getBySel('email').type(Cypress.env('email'));
    cy.getBySel('password').type(Cypress.env('password') + '{enter}');
  });
});
