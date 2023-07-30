import { mount } from 'tests/utils/emojiPicker';

describe('Emoji picker', () => {
  beforeEach(() => {
    mount();
  });

  it('should close the emoji picker', () => {
    cy.getBySel('picker').should('be.visible');

    cy.get('@toggle').click();

    cy.getBySel('picker').should('not.exist');
  });

  it('should have scroll on top', () => {
    cy.getBySel('search').should('be.visible');
    cy.getBySel('scroll').then(($el) => {
      const scrollTop = $el.scrollTop();

      cy.wrap(scrollTop).should('eq', 0);
    });
  });
});
