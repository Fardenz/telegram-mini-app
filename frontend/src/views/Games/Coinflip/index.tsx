// Coinflip component

import React, { useState } from "react"
import { Box, Button, Flex, HStack, Text, useRadioGroup } from "@chakra-ui/react"
import RadioCard from "@components/RadioCard"

// Coinflip component TODO: Refactor
const CoinflipView: React.FC = () => {
  const [coin, setCoin] = useState<"Heads" | "Tails" | null>(null) // Coin state TODO: Improve external types
  const options = ["Heads", "Tails"] // Coin options duh

  // Radio Group hook
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "CoinGame",
    defaultValue: "Heads",
    onChange: (val) => {
      setCoin(val as "Heads" | "Tails")
    },
  })

  const group = getRootProps() // Group props

  // Method who handles server call with the side chosen by user
  const handleThrowCoin = () => {
    console.log(coin)
  }

  return (
    <Flex direction="column" align="center" maxW={{ xl: "1200px" }} m="0 auto" h="100%" px="10%">
      {/* Here goes the coin animation */}
      <Box
        w="100%"
        h="60%"
        color="black"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text>Coin</Text>
      </Box>
      <Box
        w="100%"
        h="30%"
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <HStack {...group} w="100%" justifyContent="center">
          {options.map((value) => {
            const radio = getRadioProps({ value })
            return (
              <RadioCard key={value} {...radio}>
                {value}
              </RadioCard>
            )
          })}
        </HStack>
      </Box>
      <Box h="10%" mb="5%">
        <Button onClick={handleThrowCoin}>Throw Coin</Button>
      </Box>
    </Flex>
  )
}

export default CoinflipView