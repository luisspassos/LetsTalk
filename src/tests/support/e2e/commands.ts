/// <reference types="cypress" />

import { emulatorHost, firebaseConfig } from 'services/firebase';
import { emulators } from '../../../../firebase.json';
import '../sharedCommands';

Cypress.Commands.add('testLink', (link) => {
  cy.getBySel(link + ' link')
    .filter(':visible')
    .click();

  cy.getBySel(link + ' page').should('be.visible');
});

Cypress.Commands.add('testIfEmailHasBeenVerifiedOnLoginPage', () => {
  const urlToGetEmailVerificationCode = `http://${emulatorHost}:${emulators.auth.port}/emulator/v1/projects/${firebaseConfig.projectId}/oobCodes`;

  return cy
    .request(urlToGetEmailVerificationCode)
    .its('body')
    .its('oobCodes')
    .then((codes) => {
      const { oobLink } = codes[codes.length - 1];

      const [, params] = oobLink.split('?');

      cy.visit(`/?${params}`);

      cy.get('[id="email verification success"]').should('be.visible');

      submitForm();

      cy.getBySel('chat page user#1', { timeout: 30_000 }).should('be.visible');
    });
});
