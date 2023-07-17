/// <reference types="cypress" />

import { emulatorHost, firebaseConfig } from 'services/firebase';
import { emulators } from '../../../firebase.json';

function resetDb() {
  return cy.request(
    'DELETE',
    `http://${emulatorHost}:${emulators.firestore.port}/emulator/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents`
  );
}

export type ResetDbReturn = ReturnType<typeof resetDb>;

function resetUsers() {
  return cy.request(
    'DELETE',
    `http://${emulatorHost}:${emulators.auth.port}/emulator/v1/projects/${firebaseConfig.projectId}/accounts`
  );
}

export type ResetUsersReturn = ReturnType<typeof resetUsers>;

Cypress.Commands.add('resetDb', resetDb);
Cypress.Commands.add('resetUsers', resetUsers);
Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-testid="${selector}"]`, ...args);
});

export {};
