export const colors = {
  blueAlpha: {
    900: '#1d243490',
    400: 'rgba(66, 153, 225, 0.6)',
    200: 'rgb(99, 179, 237, 0.35)',
  },
  grayAlpha: {
    500: '#646C7720',
  },
  gray: {
    50: '#f9f9f9',
    200: '#d8dce7',
    250: '#CCD2E0',
    300: '#afb9c5',
    400: '#525f6f',
    500: '#646C77',
    800: '#202020',
    900: '#101010',
  },
  blue: {
    500: '#425276',
    900: '#1d2434',
  },
  red: {
    300: '#f37871',
    600: '#b03340',
  },
  get scrollbar() {
    const blueAlpha700 = `${colors.blue[900]}70`;

    return {
      dark: 'rgba(255, 255, 255, 0.36)',
      light: blueAlpha700,
    };
  },
};
