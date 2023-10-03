import { RouterProvider } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"
import { Router } from "@router/router"
import { TelegramContextProvider } from "@contexts/telegramContext"

// We can extend theme options with Chakra UI theme
// const theme = extendTheme({
//   colors: {
//     brand: {
//       900: "#1a365d",
//       800: "#153e75",
//       700: "#2a69ac",
//     },
//   },
// })
// <ChakraProvider theme={theme} resetCSS>
// https://chakra-ui.com/getting-started/cra-guide

const App: React.FC = () => {
  return (
    <TelegramContextProvider>
      <ChakraProvider resetCSS>
        <RouterProvider router={Router} />
      </ChakraProvider>
    </TelegramContextProvider>
  )
}

export default App
