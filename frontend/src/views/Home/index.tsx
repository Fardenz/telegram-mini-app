import { Link as ReactRouterLink } from "react-router-dom"
import { Box, Button, Flex, Link as ChakraLink } from "@chakra-ui/react"
import { COIN_GAME, DICE_GAME } from '@router/paths';
import Wallet from "@services/wallet";

const HomeView: React.FC = () => {
  return (
    <Flex direction="column" align="center" maxW={{ xl: "1200px" }} m="0 auto" h="100%" px="10%">
      <Box
        w="100%"
        h="80%"
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <ChakraLink color="black" as={ReactRouterLink} to={DICE_GAME}>
          Dice
        </ChakraLink>
        <ChakraLink color="black" as={ReactRouterLink} to={COIN_GAME}>
          Coinflip
        </ChakraLink>
      </Box>
      <Box w="100%" h="20%" display="flex" alignContent="center" justifyContent="end">
        <Button
          onClick={() => {
            Wallet.createPaymentLink(/*get from input*/ { amount: 15 })
          }}
        >
          Reload
        </Button>
      </Box>
    </Flex>
  )
}

export default HomeView
