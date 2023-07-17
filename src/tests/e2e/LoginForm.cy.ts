import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from 'services/firebase';

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
      cy.resetDb().then(async () => {
        await setDoc(doc(db, 'users', 'user#1'), {
          data: 'fake',
        });
      });
    }

    function createUser() {
      cy.resetUsers().then(async () => {
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
  });
});
