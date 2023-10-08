import { extendTheme } from "@chakra-ui/react";

export const customTheme = extendTheme({
  colors: {
    brand: {
      100: "#ffffff", // lightest
      200: "#30cccc",
      300: "#30cccc",
      400: "#ED2A4A",
      500: "#ED2A4A",
      600: "#33084F",
      700: "#33084F",
      800: "#33084F",
      900: "#000000", // darkest
    },
  },
})