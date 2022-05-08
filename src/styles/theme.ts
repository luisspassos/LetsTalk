import {
  ColorMode,
  extendTheme,
  ThemeConfig,
  withDefaultProps,
} from '@chakra-ui/react';
import { colors } from './colors';

type GlobalStyleProps = {
  colorMode: ColorMode;
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
      global: (props: GlobalStyleProps) => {
        const isDark = props.colorMode === 'dark';

        const scrollbarStyles = {
          boxShadow: isDark ? 'whiteAlpha-500' : 'blueAlpha-700',
          boxShadowHover: isDark ? 'whiteAlpha-700' : 'blueAlpha-900',
        };

        return {
          body: {
            bg: isDark ? 'blue.900' : 'gray.50',
            color: isDark ? 'gray.50' : 'gray.900',
          },
          '*::placeholder': {
            color: isDark ? 'whiteAlpha.800' : 'blackAlpha.800',
          },
          '*::-webkit-scrollbar': {
            width: ['8px', '10px', '12px'],
            backgroundColor: `transparent`,
          },
          '*::-webkit-scrollbar-thumb': {
            boxShadow: `inset 0 0 10px 10px var(--chakra-colors-${scrollbarStyles.boxShadow})`,
            border: 'solid 3px transparent',
          },
          '*::-webkit-scrollbar-thumb:hover': {
            boxShadow: `inset 0 0 10px 10px var(--chakra-colors-${scrollbarStyles.boxShadowHover})`,
          },
          '#chakra-toast-manager-top-right': {
            alignItems: 'end',
          },
        };
      },
    },
    ...themeConfig,
  }
);
