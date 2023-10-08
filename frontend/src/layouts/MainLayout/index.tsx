// MainLayout with applogo and balance
// Path: src/layouts/MainLayout/mainLayout.tsx

import React, { ReactNode, useEffect } from "react"
import { Box, Flex, Text, Link as ChakraLink, Image } from "@chakra-ui/react"
import { useNavigate, useLocation, Link as ReactRouterLink, } from "react-router-dom"
import { HOME } from "@router/paths"
import { useTelegramContext } from "@contexts/telegramContext"
import { WebApp } from "@grammyjs/web-app"
import { ChildrenWrapperStyle, HeaderStyle, HeaderTextStyle, WrapperStyle } from "./styles"

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { balance, getBalance } = useTelegramContext()

  useEffect(() => {
    getBalance()
    WebApp.BackButton.isVisible = location.pathname !== HOME
  }, [location])

  WebApp.BackButton.onClick(() => {
    if (location.pathname !== HOME) navigate(-1)
  })

  return (
    <Flex style={WrapperStyle} direction="column">
      <Box style={HeaderStyle}>
        <ChakraLink color="black" as={ReactRouterLink} to={HOME}>
          <Text style={HeaderTextStyle}>
            <Image src='./assets/img/poker_128px.png' alt='Casino bot logo' maxH={'20px'} />
          </Text>
        </ChakraLink >
        <Text style={HeaderTextStyle}>💰 {balance ?? 0}€</Text>
      </Box>
      <Box style={ChildrenWrapperStyle}>{children}</Box>
    </Flex>
  )
}

export default MainLayout
