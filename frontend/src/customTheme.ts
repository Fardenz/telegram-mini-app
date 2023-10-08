import { extendTheme } from "@chakra-ui/react";
import isDarkMode from "./helpers/isDarkMode";
import { WebApp } from "@grammyjs/web-app";

export const customTheme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: isDarkMode ? WebApp.themeParams.bg_color : "#ffffff",
      },
    }),
  },
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
    background: isDarkMode ? WebApp.themeParams.bg_color : "#ffffff",
  },
})
