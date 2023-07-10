import { InviteToChat } from '.';

describe('Invite to chat button', () => {
  it('should copy the app link', () => {
    function grantPermissions() {
      cy.wrap(
        Cypress.automation('remote:debugger:protocol', {
          command: 'Browser.grantPermissions',
          params: {
            permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'],
            origin: window.location.origin,
          },
        })
      );
    }

    grantPermissions();

    cy.mount(<InviteToChat />);

    cy.getBySel('invite to chat').click();

    cy.get('[id="success"]').should('be.visible');

    cy.window().then((win) => {
      win.navigator.clipboard.readText().then((text) => {
        expect(text).to.eq(process.env.NEXT_PUBLIC_PRODUCTION_URL);
      });
    });
  });
});
