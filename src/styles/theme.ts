import { extendTheme, ThemeConfig, withDefaultProps } from '@chakra-ui/react';
import { colors } from './colors';

type GlobalStyleProps = {
  colorMode: 'light' | 'dark';
};

export const themeConfig: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};

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
    colors,
    styles: {
      global: (props: GlobalStyleProps) => ({
        body: {
          bg: props.colorMode === 'dark' ? 'blue.900' : 'gray.50',
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
        '#chakra-toast-manager-top-right': {
          alignItems: 'end',
        },
      }),
    },
    ...themeConfig,
  }
);
