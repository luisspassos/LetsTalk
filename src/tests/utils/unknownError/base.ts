import { FirebaseError } from 'firebase/app';

export type SubmitForm = () => void;
export type FuncToBeStubbed<WinProp extends keyof Cypress.AUTWindow> = [
  WinProp,
  keyof Cypress.AUTWindow[WinProp]
];

/**
 * A base function that tests if the unknown error is being displayed based on the error thrown
 */

export function base<WinProp extends keyof Cypress.AUTWindow>(
  err: FirebaseError | string,
  submitForm: SubmitForm,
  [winProp, funcToBeStubbed]: FuncToBeStubbed<WinProp>
) {
  cy.window().then((win) => {
    cy.stub(win[winProp], funcToBeStubbed).callsFake(() => {
      throw err;
    });

    submitForm();

    cy.get('[id="unknown error"]').should('be.visible');
  });
}
