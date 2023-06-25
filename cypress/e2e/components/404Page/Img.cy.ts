describe('Img', () => {
  it('renders', () => {
    function visit(darkAppearance: boolean) {
      cy.visit('/404', {
        failOnStatusCode: false,
        onBeforeLoad: (win) => {
          cy.stub(win, 'matchMedia')
            .withArgs('(prefers-color-scheme: dark)')
            .returns({
              matches: darkAppearance,
            });
        },
      });
    }

    cy.viewport('macbook-16');
    visit(false);
    cy.get('img').should('have.attr', 'src').should('include', 'light');
  });
});
