import { RouterProvider } from "react-router-dom"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { Router } from "@router/router"
import { TelegramContextProvider } from "@contexts/telegramContext"

const theme = extendTheme({
  colors: {
    brand: {
      100: "#30cccc",
      200: "#30cccc",
      300: "#30cccc",
      400: "#33084F",
      500: "#33084F",
      600: "#ED2A4A",
      700: "#ED2A4A",
      800: "#ED2A4A",
      900: "#ED2A4A",
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
