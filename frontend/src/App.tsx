import { RouterProvider } from "react-router-dom"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { Router } from "@router/router"
import { TelegramContextProvider } from "@contexts/telegramContext"

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
