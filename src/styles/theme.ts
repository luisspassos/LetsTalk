import { ColorMode, extendTheme, ThemeConfig, Modal } from '@chakra-ui/react';
import { colors } from './colors';

type GlobalStyleProps = {
  colorMode: ColorMode;
};

export const themeConfig: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};

const boxShadow = `0 0 0 3px ${colors.blueAlpha[400]}`;

export const theme = extendTheme({
  fonts: {
    heading: 'Poppins, Noto Color Emoji, sans-serif',
    body: 'Poppins, Noto Color Emoji, sans-serif',
    message: 'Roboto, Noto Color Emoji, sans-serif',
  },
  fontSizes: {
    'configurations-page-md': '.8em',
  },
  shadows: {
    outline: boxShadow,
    'inner-blue': `inset ${boxShadow}`,
  },
  colors,
  styles: {
    global: (props: GlobalStyleProps) => {
      const isDark = props.colorMode === 'dark';

      const placeholderColor = isDark ? 'whiteAlpha.800' : 'blackAlpha.700';

      const scrollbarColor = isDark
        ? colors.scrollbar.dark
        : colors.scrollbar.light;

      return {
        '*': {
          wordBreak: 'break-word',
          scrollbarColor: `${scrollbarColor} transparent`,
          scrollbarWidth: 'thin',
        },
        body: {
          bg: isDark ? 'blue.900' : 'gray.50',
          color: isDark ? 'gray.50' : 'gray.900',
        },
        '*::placeholder': {
          color: placeholderColor,
        },
        '::-webkit-scrollbar': {
          width: ['3px', '6px'],
        },
        '::-webkit-scrollbar-thumb': {
          bgColor: scrollbarColor,
        },
        '#chakra-toast-manager-top-right': {
          alignItems: 'end',
        },
      };
    },
  },
  ...themeConfig,
});

// default props

Modal.defaultProps = {
  ...Modal.defaultProps,
  motionPreset: 'slideInBottom',
  isCentered: true,
};
