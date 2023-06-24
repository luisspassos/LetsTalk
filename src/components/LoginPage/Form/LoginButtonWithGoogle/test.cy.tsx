import { LoginButtonWithGoogle } from '.';

describe('Login button with Google', () => {
  it('renders', () => {
    cy.mount(<LoginButtonWithGoogle />);

    cy.getBySel('google login button').click();
  });
});
