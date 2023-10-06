// MainLayout with applogo and balance
// Path: src/layouts/MainLayout/mainLayout.tsx

import React, { ReactNode } from "react"
import { Box, Flex, IconButton, Text } from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { useNavigate, useLocation } from "react-router-dom"
import { HOME } from "@router/paths"

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Flex direction="column" align="center" maxW={{ xl: "1200px" }} m="0 auto">
      <Box
        w="100%"
        h="100px"
        bg="telegram.500"
        px="10%"
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        {location.pathname !== HOME ? (
          <IconButton aria-label="Go back" onClick={() => navigate(-1)} icon={<ArrowBackIcon />} />
        ) : null}

        <Text fontSize="medium" fontWeight="bold">
          Telegram Mini App
        </Text>
        <Text fontSize="medium" fontWeight="bold">
          15€
        </Text>
      </Box>
      <Box w="100%" h="calc(100vh - 100px)">
        {children}
      </Box>
    </Flex>
  )
}

export default MainLayout
