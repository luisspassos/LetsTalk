import { extendTheme, withDefaultProps } from '@chakra-ui/react';

export const theme = extendTheme(
  withDefaultProps({
    defaultProps: {
      isLazy: true,
    },
    components: ['Menu', 'Popover'],
  }),
  {
    fonts: {
      heading: 'Poppins, sans-serif',
      body: 'Poppins, sans-serif',
    },
    fontWeights: {
      bold: 600,
    },
    colors: {
      blueAlpha: {
        900: '#1d243490',
        700: '#1d243470',
      },
      grayAlpha: {
        500: '#646C7720',
      },
      gray: {
        50: '#f9f9f9',
        200: '#d8dce7',
        300: '#afb9c5',
        400: '#525f6f',
        500: '#646C77',
        800: '#202020',
        900: '#101010',
      },
      blue: {
        900: '#1d2434',
      },
      red: {
        300: '#f37871',
        600: '#b03340',
      },
    },
    styles: {
      global: {
        body: {
          bg: 'gray.50',
          color: 'gray.900',
        },
        '*::-webkit-scrollbar': {
          width: '12px',
          backgroundColor: `transparent`,
        },
        '*::-webkit-scrollbar-thumb': {
          boxShadow: 'inset 0 0 10px 10px var(--chakra-colors-blueAlpha-700)',
          border: 'solid 3px transparent',
        },
        '*::-webkit-scrollbar-thumb:hover': {
          boxShadow: 'inset 0 0 10px 10px var(--chakra-colors-blueAlpha-900)',
        },
      },
    },
  }
);
