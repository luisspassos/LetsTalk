import { FirebaseError } from 'firebase/app';
import { SubmitForm, FuncToBeStubbed, base } from './base';

/**
 * A function that tests if the unknown error is being displayed on the screen when a firebase error is thrown 
 *
 * @param submitForm A function that fills and submits the form
 * @param funcToBeStubbed An array containing the property of window where the function to be stubbed is. The format must be: `[winProp, funcToBeStubbed]`
 *
 * @example
 * ```
 * function login() { ... }
 * 
 * useEffect(() => {
    if (window.Cypress) {
      window.auth = login;
    }
  }, []); // You could use the useCypress hook to handle this easily.
 * 
 * testUnknownErrorFromFirebase(() => {
 *   cy.getBySel('email').type(Cypress.env('email'));
 *
 *   cy.getBySel('submit').click();
 * }, ['auth', 'login'])
 * ```
 */
export function testUnknownErrorFromFirebase<
  WinProp extends keyof Cypress.AUTWindow
>(submitForm: SubmitForm, funcToBeStubbed: FuncToBeStubbed<WinProp>) {
  it.only('should show an unknown error from firebase', () => {
    base(new FirebaseError('', ''), submitForm, funcToBeStubbed);
  });
}
