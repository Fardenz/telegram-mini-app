import { Link as ReactRouterLink, useLocation } from "react-router-dom"
import { Box, Button, Flex, Link as ChakraLink, Image } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import WalletModal from "@components/Wallet/WalletModal"
import { COIN_GAME, DICE_GAME } from "@router/paths"
import { WebApp } from "@grammyjs/web-app"
import {
  ContainerButtonStyle,
  GameSelectorContainerStyle,
  GameSelectorGifStyle,
  WrapperStyle,
  roundedButtonStyle,
} from "./styles"
import { useTelegramContext } from "@contexts/telegramContext"
import { useCustomToast } from "@helpers/toastUtil"
import isDarkMode from "@helpers/isDarkMode"

const HomeView: React.FC = () => {
  const location = useLocation()
  const [isModalOpen, setModalOpen] = useState(false)
  const { balance } = useTelegramContext()
  const showToast = useCustomToast()
  const hasNotEnoughMoneyToPlay = balance !== null && balance < 1

  useEffect(() => {
    if (hasNotEnoughMoneyToPlay) {
      showToast({
        title: "Please deposit money in your wallet to play 🏦",
        status: "info",
      })
    }
  }, [])

  const openModal = () => setModalOpen(true)

  useEffect(() => {
    WebApp.MainButton.setParams({ color: isDarkMode ? "#30cccc" : "#33084F", text: "Wallet 👛" })
      .show()
      .onClick(openModal)

    return () => {
      WebApp.MainButton.offClick(openModal)
    }
  }, [location.pathname])

  return (
    <Flex style={WrapperStyle} direction="row">
      <Box style={ContainerButtonStyle} flexDirection={{ base: "column", md: "row" }}>
        <ChakraLink
          color="black"
          as={ReactRouterLink}
          to={hasNotEnoughMoneyToPlay ? "./" : DICE_GAME}
        >
          <Flex direction="column">
            <Box style={GameSelectorContainerStyle}>
              <Image
                src={`./assets/img/dice-animation-${isDarkMode ? "dark" : "light"}.gif`}
                alt="Dice game logo"
                style={GameSelectorGifStyle}
              />
            </Box>
            <Box>
              <Flex direction="row" justifyContent={"center"}>
                <Button
                  colorScheme="brand"
                  variant="outline"
                  style={roundedButtonStyle}
                  isDisabled={hasNotEnoughMoneyToPlay}
                >
                  Dice 🎲
                </Button>
              </Flex>
            </Box>
          </Flex>
        </ChakraLink>
        <ChakraLink
          color="black"
          as={ReactRouterLink}
          to={hasNotEnoughMoneyToPlay ? "./" : COIN_GAME}
        >
          <Flex direction="column">
            <Box style={GameSelectorContainerStyle}>
              <Image
                src={`./assets/img/coin-animation-${isDarkMode ? "dark" : "light"}.gif`}
                alt="Coinflip game logo"
                style={GameSelectorGifStyle}
              />
            </Box>
            <Box>
              <Flex direction="row" justifyContent={"center"}>
                <Button
                  colorScheme="brand"
                  variant="outline"
                  style={roundedButtonStyle}
                  isDisabled={hasNotEnoughMoneyToPlay}
                >
                  Coinflip 🪙
                </Button>
              </Flex>
            </Box>
          </Flex>
        </ChakraLink>
      </Box>
      <WalletModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </Flex>
  )
}

export default HomeView
