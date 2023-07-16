import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth, emulatorHost, firebaseConfig } from 'services/firebase';
import { myFirebase } from 'tests/support/e2e';
import { emulators } from '../../../firebase.json';

describe('Login form', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should login a user', () => {
    function submitForm() {
      cy.getBySel('email').type(Cypress.env('email'));
      cy.getBySel('password').type(Cypress.env('password') + '{enter}');
    }

    function resetDatabase() {
      cy.request(
        'DELETE',
        `http://${emulatorHost}:${emulators.firestore.port}/emulator/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents`
      );
    }

    function deleteAllUsers() {
      cy.request(
        'DELETE',
        `http://${emulatorHost}:${emulators.auth.port}/emulator/v1/projects/${firebaseConfig.projectId}/accounts`
      );
    }

    resetDatabase();
    deleteAllUsers();

    myFirebase
      .auth()
      .createUserWithEmailAndPassword(
        Cypress.env('email'),
        Cypress.env('password')
      );

    const username = 'user#1';

    myFirebase.firestore().collection('users').doc(username).set({
      data: 'fake',
    });

    const unsub = onAuthStateChanged(auth, (user) => {
      if (user === null) return;

      updateProfile(user, {
        displayName: username,
      });

      unsub();
    });

    submitForm();

    cy.get('[id="email verification"]').should('be.visible');

    const urlToGetEmailVerificationCode = `http://${emulatorHost}:${emulators.auth.port}/emulator/v1/projects/${firebaseConfig.projectId}/oobCodes`;

    cy.request(urlToGetEmailVerificationCode)
      .its('body')
      .its('oobCodes')
      .then((codes) => {
        const { oobLink } = codes[codes.length - 1];

        const [, params] = oobLink.split('?');

        cy.visit(`/?${params}`);

        cy.get('[id="email verification success"]').should('be.visible');

        submitForm();

        cy.getBySel('chat page user#1').should('be.visible');
      });
  });
});
