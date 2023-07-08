import { FirebaseError } from 'firebase/app';

type SubmitForm = () => void;
type FuncToBeStubbed = keyof Cypress.AUTWindow['auth'];

function test(
  err: FirebaseError | string,
  submitForm: SubmitForm,
  funcToBeStubbed: FuncToBeStubbed
) {
  cy.window().then((win) => {
    cy.stub(win.auth, funcToBeStubbed).callsFake(() => {
      throw err;
    });

    submitForm();

    cy.get('div[id="unknown error"]').should('be.visible');
  });
}

/**
 * @param submitForm A function that fills and submits the form
 *
 * @example
 * ```
 * testUnknownError(() => {
 *   cy.getBySel('email').type(Cypress.env('email'));
 *
 *   cy.getBySel('submit').click();
 * })
 * ```
 */

export function testUnknownError(
  submitForm: SubmitForm,
  funcToBeStubbed: FuncToBeStubbed
): void {
  it.only('should show an unknown error', () => {
    test('err', submitForm, funcToBeStubbed);
  });
}

/**
 * @param submitForm A function that fills and submits the form
 *
 * @example
 * ```
 * testUnknownErrorFromFirebase(() => {
 *   cy.getBySel('email').type(Cypress.env('email'));
 *
 *   cy.getBySel('submit').click();
 * })
 * ```
 */
export function testUnknownErrorFromFirebase(
  submitForm: SubmitForm,
  funcToBeStubbed: FuncToBeStubbed
) {
  it.only('should show an unknown error from firebase', () => {
    test(new FirebaseError('', ''), submitForm, funcToBeStubbed);
  });
}

/**
 * @param submitForm A function that fills and submits the form
 *
 * @example
 * ```
 * testUnknownErrorFromAndNotFromFirebase(() => {
 *   cy.getBySel('email').type(Cypress.env('email'));
 *
 *   cy.getBySel('submit').click();
 * })
 * ```
 */

export function testUnknownErrorFromAndNotFromFirebase(
  submitForm: SubmitForm,
  funcToBeStubbed: FuncToBeStubbed
) {
  testUnknownError(submitForm, funcToBeStubbed);
  testUnknownErrorFromFirebase(submitForm, funcToBeStubbed);
}
