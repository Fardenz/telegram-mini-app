// MainLayout with applogo and balance
// Path: src/layouts/MainLayout/mainLayout.tsx

import React, { ReactNode, useEffect } from "react"
import { Box, Flex, Text } from "@chakra-ui/react"
import { useNavigate, useLocation } from "react-router-dom"
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
        <Text style={HeaderTextStyle}>CasinoX</Text>
        <Text style={HeaderTextStyle}>{balance}€</Text>
      </Box>
      <Box style={ChildrenWrapperStyle}>{children}</Box>
    </Flex>
  )
}

export default MainLayout
