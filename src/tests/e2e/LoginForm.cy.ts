import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db, emulatorHost, firebaseConfig } from 'services/firebase';
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

    const username = 'user#1';

    function addUserInDb() {
      function resetDb() {
        return cy.request(
          'DELETE',
          `http://${emulatorHost}:${emulators.firestore.port}/emulator/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents`
        );
      }

      resetDb().then(async () => {
        await setDoc(doc(db, 'users', 'user#1'), {
          data: 'fake',
        });
      });
    }

    function createUser() {
      function resetUsers() {
        return cy.request(
          'DELETE',
          `http://${emulatorHost}:${emulators.auth.port}/emulator/v1/projects/${firebaseConfig.projectId}/accounts`
        );
      }

      resetUsers().then(async () => {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          Cypress.env('email'),
          Cypress.env('password')
        );

        updateProfile(user, {
          displayName: username,
        });
      });
    }

    createUser();
    addUserInDb();

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

        cy.getBySel('chat page user#1', { timeout: 30_000 }).should(
          'be.visible'
        );
      });
  });
});
