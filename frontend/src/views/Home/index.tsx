import { Link as ReactRouterLink, useLocation } from "react-router-dom"
import { Box, Button, Flex, Link as ChakraLink } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import WalletModal from "../../components/Wallet/WalletModal"
import { COIN_GAME, DICE_GAME } from "@router/paths"
import { WebApp } from "@grammyjs/web-app"
import { GameSelectorGifStyle } from "./styles"
import { useTelegramContext } from "../../contexts/telegramContext"
import { useCustomToast } from "../../helpers/toastUtil"

const HomeView: React.FC = () => {
  const location = useLocation()
  const [isModalOpen, setModalOpen] = useState(false)
  const { balance } = useTelegramContext()
  const showToast = useCustomToast()
  const hasNotEnoughMoneyToPlay = balance !== null && balance < 1

  useEffect(() => {
      if (hasNotEnoughMoneyToPlay) {
        showToast({
          title: 'Please deposit money in your wallet to play',
          status: "info"
        })
      }
  }, [])

  const openModal = () => setModalOpen(true)

  useEffect(() => {
    WebApp.MainButton.setParams({ color: '#33084F', text: 'Wallet' }).show().onClick(openModal)

    return () => {
      WebApp.MainButton.offClick(openModal)
    }
  }, [location.pathname])

  return (
    <Flex direction="row" align="center" maxW={{ xl: "1200px" }} m="0 auto" h="100%" px="10%">
      <Box
        w="100%"
        h="100%"
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        flexDirection={{ base: "column", md: "row" }}
      >
        <ChakraLink color="black" as={ReactRouterLink} to={hasNotEnoughMoneyToPlay ? './' : DICE_GAME}>
          <Flex direction="column">
            <Box>
              <img src="./assets/img/dice.gif" style={GameSelectorGifStyle} alt="Description of GIF" />
            </Box>
            <Box>
              <Flex direction="row" justifyContent={"center"}>
                <Button colorScheme="teal" variant="outline" isDisabled={hasNotEnoughMoneyToPlay}> Dice </Button>
              </Flex>
            </Box>
          </Flex>
        </ChakraLink>
        <ChakraLink color="black" as={ReactRouterLink} to={hasNotEnoughMoneyToPlay ? './' : COIN_GAME}>
          <Flex direction="column">
            <Box>
              <img src="./assets/img/dice.gif" style={GameSelectorGifStyle} alt="Dice GIF" />
            </Box>
            <Box>
              <Flex direction="row" justifyContent={"center"}>
                <Button colorScheme="teal" variant="outline" isDisabled={hasNotEnoughMoneyToPlay}> Coinflip </Button>
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
