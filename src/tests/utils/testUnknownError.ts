import { FirebaseError } from 'firebase/app';

type SubmitForm = () => void;

function test(err: FirebaseError | string, submitForm: SubmitForm) {
  cy.window().then((win) => {
    cy.stub(win.auth, 'signInWithEmailAndPassword').callsFake(() => {
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

export function testUnknownError(submitForm: SubmitForm): void {
  it('should show an unknown error', () => {
    test('err', submitForm);
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
export function testUnknownErrorFromFirebase(submitForm: SubmitForm) {
  it('should show an unknown error from firebase', () => {
    test(new FirebaseError('', ''), submitForm);
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

export function testUnknownErrorFromAndNotFromFirebase(submitForm: SubmitForm) {
  testUnknownError(submitForm);
  testUnknownErrorFromFirebase(submitForm);
}
