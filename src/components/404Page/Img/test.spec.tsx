import { ColorMode, useColorMode } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { getImg } from 'tests/test_utils/404Page/Img';
import { Img } from '.';

jest.mock('@chakra-ui/react', () => {
  return {
    ...jest.requireActual('@chakra-ui/react'),
    useColorMode: jest.fn().mockResolvedValue({
      colorMode: 'light',
    }),
  };
});

const useColorModeMocked = mocked(useColorMode);

describe('Img component', () => {
  function renderImg() {
    render(<Img />);

    const { img } = getImg();

    return { img };
  }

  describe('should render an image for each color mode', () => {
    const colors: ColorMode[] = ['dark', 'light'];

    for (const color of colors) {
      it(`${color}`, () => {
        useColorModeMocked.mockReturnValueOnce({
          colorMode: color,
        } as any);

        const { img } = renderImg();

        expect(img).toHaveAttribute(
          'src',
          `/images/page_not_found/${color}.svg`
        );
      });
    }
  });

  describe('should have fixed styles', () => {
    const styles = ['width', 'height'];

    for (const style of styles) {
      it(`${style}`, () => {
        const { img } = renderImg();

        expect(img).toHaveAttribute(style);
      });
    }
  });
});
