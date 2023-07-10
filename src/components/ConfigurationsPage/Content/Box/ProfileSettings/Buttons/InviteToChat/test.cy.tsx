import { InviteToChat } from '.';

describe('Invite to chat button', () => {
  it('should copy the app link', () => {
    cy.mount(<InviteToChat />);

    cy.getBySel('invite to chat')
      .click()
      .then(() => {
        cy.window().then((win) => {
          win.navigator.clipboard.readText().then((text) => {
            expect(text).to.eq('your copied text');
          });
        });
      });

    cy.get('[id="success"]').should('be.visible');
  });
});
