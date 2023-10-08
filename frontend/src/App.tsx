import { RouterProvider } from "react-router-dom"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { Router } from "@router/router"
import { TelegramContextProvider } from "@contexts/telegramContext"

const theme = extendTheme({
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
      900: "#33084F", // darkest
    },
  },
})

const App: React.FC = () => {
  return (
    <TelegramContextProvider>
      <ChakraProvider resetCSS theme={theme}>
        <RouterProvider router={Router} />
      </ChakraProvider>
    </TelegramContextProvider>
  )
}

export default App
