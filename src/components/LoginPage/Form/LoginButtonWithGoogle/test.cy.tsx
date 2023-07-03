import { LoginButtonWithGoogle } from '.';

function stubWindowOpen() {
  return cy.stub(window, 'open');
}

describe('Login button with Google', () => {
  beforeEach(() => {
    cy.mount(<LoginButtonWithGoogle />);
  });

  it('should show an unknown error', () => {
    stubWindowOpen();

    cy.getBySel('google login button').click({ force: true });

    cy.get('div[id="unknown error"]').should('be.visible');
  });

  it('should open a login popup', () => {
    stubWindowOpen();

    cy.getBySel('google login button').click({ force: true });

    cy.window().its('open').should('be.called');
  });
});
