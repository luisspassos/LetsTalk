import { errorToastWhenChangingPassword, Form } from '.';
import { testDifferentPasswords } from 'tests/utils/testDifferentPasswords';

import { testError } from 'tests/utils/error/test';

describe('Change password form', () => {
  beforeEach(() => {
    cy.mount(<Form actionCode='' />);
  });

  it('should show error messages if inputs are empty', () => {
    cy.getBySel('submit').click();

    cy.testPasswordEmpty();
  });

  testDifferentPasswords();

  testError({
    checkIfErrorAppeared: () => {
      if (typeof errorToastWhenChangingPassword.opts.title !== 'string')
        throw 'Is not a string';

      cy.contains(errorToastWhenChangingPassword.opts.title);
    },
    funcToBeStubbed: ['auth', 'confirmPasswordReset'],
    submitForm: () => {
      cy.getBySel('password').type('123456');
      cy.getBySel('password_confirmation').type('123456' + '{enter}');
    },
  });
});
