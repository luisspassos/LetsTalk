import { toast } from '@chakra-ui/react';

import { SubmitForm, FuncToBeStubbed } from './base';
import { testUnknownError } from './testUnknownError';
import { testUnknownErrorFromFirebase } from './testUnknownErrorFromFirebase';

/**
 * A function that tests if the unknown error is being displayed on the screen
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
 * testUnknownErrorFromAndNotFromFirebase(() => {
 *   cy.getBySel('email').type(Cypress.env('email'));
 *
 *   cy.getBySel('submit').click();
 * }, ['auth', 'login'])
 * ```
 */
export function testUnknownErrorFromAndNotFromFirebase<
  WinProp extends keyof Cypress.AUTWindow
>(submitForm: SubmitForm, funcToBeStubbed: FuncToBeStubbed<WinProp>) {
  beforeEach(() => {
    function closeToasts() {
      toast.closeAll();

      cy.get('[id="unknown error"]').should('not.exist');
    }

    closeToasts();
  });

  testUnknownError(submitForm, funcToBeStubbed);
  testUnknownErrorFromFirebase(submitForm, funcToBeStubbed);
}
