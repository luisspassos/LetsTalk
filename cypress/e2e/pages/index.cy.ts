import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../src/services/firebase';

describe('Login page', () => {
  // beforeEach(() => {
  //   cy.visit('/');
  // });
  // it('should open google sign in popup', () => {
  //   cy.visit('/', {
  //     onBeforeLoad(win) {
  //       cy.stub(win, 'open');
  //     },
  //   });
  //   cy.get('[data-cy="google login button"]').click();
  //   cy.window().its('open').should('be.called');
  // });

  it('a', () => {
    cy.visit('/');

    signInWithPopup(auth, new GoogleAuthProvider());

    cy.get('[data-cy="google login button"]').should('be.visible');
  });
});
