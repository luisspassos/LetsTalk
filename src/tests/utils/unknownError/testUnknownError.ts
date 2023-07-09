import { SubmitForm, FuncToBeStubbed, base } from './base';

/**
 * A function that tests if the unknown error is being displayed on the screen when an error non firebase error is thrown 
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
 * testUnknownError(() => {
 *   cy.getBySel('email').type(Cypress.env('email'));
 *
 *   cy.getBySel('submit').click();
 * }, ['auth', 'login'])
 * ```
 */

export function testUnknownError<WinProp extends keyof Cypress.AUTWindow>(
  submitForm: SubmitForm,
  funcToBeStubbed: FuncToBeStubbed<WinProp>
): void {
  it.only('should show an unknown error', () => {
    base('err', submitForm, funcToBeStubbed);
  });
}
