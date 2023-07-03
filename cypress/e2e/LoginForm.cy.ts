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
    });
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) return;

      updateProfile(user, {
        displayName: username,
      });

      unsub();
    });

    cy.getBySel('email').type('test@example.com');
    cy.getBySel('password').type('123456{enter}');
  });
});

export {};
