import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: "Poppins, sans-serif",
    body: "Poppins, sans-serif",
  },
  colors: {
    gray: {
      50: "#f9f9f9",
      200: "#d8dce7",
      300: "#afb9c5",
      400: "#525f6f",
      500: "#646C77",
      800: "#202020",
      900: "#101010",
    },
    blue: {
      900: "#1d2434",
    },
    red: {
      300: "#f37871",
      600: "#b03340",
    },
  },
  styles: {
    global: {
      body: {
        bg: "gray.50",
        color: "gray.900",
      },
    },
  },
});
