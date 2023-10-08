// Coinflip component

import React, { useEffect, useState } from "react"
import { Box, Flex, HStack, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, useRadioGroup } from "@chakra-ui/react"
import RadioCard from "@components/RadioCard"
import GamesService from "@services/games"
import { useTelegramContext } from "@contexts/telegramContext"
import CoinFlip from "@components/CoinFlip"
import { WebApp } from "@grammyjs/web-app"
import { CoinBoxStyle, HStackStyle, OptionBoxStyle, WrapperStyle } from "./styles"
import { useCustomToast } from "@helpers/toastUtil"
import { InfoOutlineIcon } from "@chakra-ui/icons"

type CoinType = "Heads" | "Tails"

// Coinflip component TODO: Refactor
const CoinflipView: React.FC = () => {
  const { getBalance } = useTelegramContext() // Telegram context
  const [userChoice, setUserChoice] = useState<CoinType>("Heads") // Coin state TODO: Improve external types
  const [result, setResult] = useState<CoinType | "">("") // Result state
  const options = ["Heads", "Tails"] // Coin options duh
  const showToast = useCustomToast()

  // Radio Group hook
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "CoinGame",
    defaultValue: "Heads",
    onChange: (val) => {
      setUserChoice(val as CoinType)
    },
  })

  const group = getRootProps() // Group props

  // Method who handles server call with the side chosen by user
  const handleThrowCoin = async () => {
    if (!userChoice) {
      showToast({
        title: `Please select a side.`,
        status: 'info'
      });
      return;
    }

    const res = await GamesService.play(userChoice === "Heads" ? [1] : [2], "coinflip")
    setResult(res === 1 ? "Heads" : "Tails")
    setTimeout(() => {
      showToast({
        title: `You ${res === (userChoice == "Heads" ? 1 : 2) ? "won" : "lost"}`,
        status: res === (userChoice == "Heads" ? 1 : 2) ? "success" : "error",
      });
      getBalance().catch((error) => { console.error(error) })

      setResult("")
    }, 1500)
  }

  useEffect(() => {
    if (WebApp.MainButton.isVisible)
      WebApp.MainButton.setText("Throw Coin").offClick(handleThrowCoin).onClick(handleThrowCoin)

    return () => {
      WebApp.MainButton.offClick(handleThrowCoin)
    }
  }, [location.pathname, userChoice])

  return (
    <Flex direction="column" style={WrapperStyle}>
      <Box display={'flex'} justifyContent={'right'} paddingTop={'5px'}>
        <Popover>
          <PopoverTrigger>
            <InfoOutlineIcon></InfoOutlineIcon>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>Every bet is 1€</PopoverBody>
          </PopoverContent>
        </Popover >
      </Box>
      <Box style={CoinBoxStyle}>
        <CoinFlip result={result} />
      </Box>
      <Box style={OptionBoxStyle}>
        <HStack {...group} style={HStackStyle}>
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
    </Flex>
  )
}

export default CoinflipView
