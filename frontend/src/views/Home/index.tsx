import { Link as ReactRouterLink } from "react-router-dom"
import { Box, Button, Flex, Link as ChakraLink } from "@chakra-ui/react"
import { COIN_GAME, DICE_GAME } from '../../router/paths';
import Wallet from "../../services/wallet";
import { useState } from "react";
import WalletModal from "../../components/Wallet/WalletModal";

const HomeView: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  
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
            setModalOpen(true);
          }}
        >
          Reload
        </Button>
      </Box>
      <WalletModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </Flex>
  )
}


export default HomeView
