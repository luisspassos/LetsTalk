import { Form } from '.';
import { testDifferentPasswords } from 'tests/utils/testDifferentPasswords';

describe('Change password form', () => {
  beforeEach(() => {
    cy.mount(<Form actionCode='' />);
  });

  it('should show error messages if inputs are empty', () => {
    cy.getBySel('submit').click();

    cy.testPasswordEmpty();
  });

  testDifferentPasswords();
});
