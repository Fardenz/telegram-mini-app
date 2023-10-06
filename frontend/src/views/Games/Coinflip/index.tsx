// Coinflip component

import React, { useState } from "react"
import { Box, Button, Flex, HStack, Text, useRadioGroup } from "@chakra-ui/react"
import RadioCard from "@components/RadioCard"
import GamesService from "@services/games"
import { useTelegramContext } from "@contexts/telegramContext"
import CoinFlip from "@components/CoinFlip"

type CoinType = "Heads" | "Tails"

// Coinflip component TODO: Refactor
const CoinflipView: React.FC = () => {
  const { getBalance } = useTelegramContext() // Telegram context
  const [coin, setCoin] = useState<CoinType>("Heads") // Coin state TODO: Improve external types
  const [result, setResult] = useState<CoinType | "">("") // Result state
  const options = ["Heads", "Tails"] // Coin options duh

  // Radio Group hook
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "CoinGame",
    defaultValue: "Heads",
    onChange: (val) => {
      setCoin(val as CoinType)
    },
  })

  const group = getRootProps() // Group props

  // Method who handles server call with the side chosen by user
  const handleThrowCoin = async () => {
    if (!coin) return alert("Please select a side")

    console.log(coin)
    const res = await GamesService.play(coin === "Heads" ? [1] : [2], "coinflip")
    setResult(res === 1 ? "Heads" : "Tails")
    alert(`The result was ${res === 1 ? "Heads" : "Tails"}`)
    getBalance()
    setResult("")
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
        <CoinFlip result={result} />
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
