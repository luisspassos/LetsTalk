import { ColorMode } from '@chakra-ui/react';
import { Img } from '.';

function mount() {
  cy.mount(<Img />);
}

describe('Img', () => {
  describe('should render an image for each color mode', () => {
    const colors: ColorMode[] = ['dark', 'light'];

    for (const color of colors) {
      it(`${color}`, () => {
        cy.stub(Img, 'useColorMode').returns({ colorMode: color });

        mount();

        cy.get('img')
          .should('be.visible')
          .and('have.prop', 'naturalWidth')
          .should('be.greaterThan', 0);

        cy.get('img').should('have.attr', 'src').should('include', color);
      });
    }
  });

  it('should have fixed width and height', () => {
    mount();

    for (const value of ['width', 'height']) {
      cy.get('img').should('have.attr', value);
    }
  });
});
