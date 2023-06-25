import { ColorMode } from '@chakra-ui/react';
import { Img } from '.';

describe('Img', () => {
  describe('should render an image for each color mode', () => {
    const colors: ColorMode[] = ['dark', 'light'];

    for (const color of colors) {
      it(`${color}`, () => {
        cy.stub(Img, 'useColorMode').returns({ colorMode: color });

        cy.mount(<Img />);

        cy.get('img').should('have.attr', 'src').should('include', color);
      });
    }
  });
});
