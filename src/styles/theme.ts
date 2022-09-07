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

        const placeholderColor = isDark ? 'whiteAlpha.800' : 'blackAlpha.700';

        return {
          '*': {
            wordBreak: 'break-word',
          },
          body: {
            bg: isDark ? 'blue.900' : 'gray.50',
            color: isDark ? 'gray.50' : 'gray.900',
          },
          '*::placeholder': {
            color: placeholderColor,
          },
          '*[placeholder]:empty::before': {
            content: 'attr(placeholder)',
            color: placeholderColor,
            cursor: 'text',
          },
          '::-webkit-scrollbar': {
            width: ['3px', '6px'],
          },
          '::-webkit-scrollbar-thumb': {
            bgColor: isDark ? colors.scrollbar.dark : colors.scrollbar.light,
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
