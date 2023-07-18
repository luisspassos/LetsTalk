import { Footer } from '..';

describe('Emoji picker', () => {
  it('renders', () => {
    cy.mount(<Footer />);
    cy.getBySel('toggle emoji picker').click();
  });
});
