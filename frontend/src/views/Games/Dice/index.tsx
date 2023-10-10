// Coinflip component

import React, { useEffect, useState } from "react"
import { Box, Checkbox, Flex, Grid, Stack, Text } from "@chakra-ui/react"
import Dice from "@components/Dice"
import GamesService from "@services/games"
import { useTelegramContext } from "@contexts/telegramContext"
import { WebApp } from "@grammyjs/web-app"
import { DiceContainerStyle, OptionsContainerStyle, StackStyle, WrapperStyle } from "./styles"
import { useCustomToast } from "@helpers/toastUtil"
import { InformationPopover } from "@components/Games/informationPopover"
import isDarkMode from "@helpers/isDarkMode"
import promisifiedSetTimeout from "@helpers/promisifiedSetTimeout"

const DiceView: React.FC = () => {
  const { balance, getBalance } = useTelegramContext()
  const options = [
    { display: "1️⃣", value: 1 },
    { display: "2️⃣", value: 2 },
    { display: "3️⃣", value: 3 },
    { display: "4️⃣", value: 4 },
    { display: "5️⃣", value: 5 },
    { display: "6️⃣", value: 6 },
  ]

  const [checkedItems, setCheckedItems] = useState(options.map(() => false))
  const [triggerRoll, setTriggerRoll] = useState<boolean>(false)
  const [outputDice, setOutputDice] = useState<number>(1)
  const showToast = useCustomToast()

  // Handle backend call
  const handleThrowDice = async () => {
    const opt = options.filter((val, idx) => checkedItems[idx] && val).map((val) => val.value)
    if (opt.length < 1) {
      showToast({
        title: "Please select at least one option 1️⃣",
        status: "info",
      })
      return
    }

    if (balance !== null && balance < opt.length) {
      showToast({
        title: "You don't have enough money to play this game. 💸",
        status: "error",
      })
      return
    }

    setTriggerRoll(true)

    const [res]: [number | undefined, undefined] = await Promise.all([
      GamesService.play(opt, "dice"),
      promisifiedSetTimeout(1000),
    ])

    if (!res) {
      setTriggerRoll(false)
      showToast({
        title: "Something went wrong",
        status: "error",
      })
      return
    }

    setOutputDice(res)
    setTriggerRoll(false)
    await getBalance()
    const hasUserWon = opt.some((value) => value === res)
    showToast({
      title: `It was a ${res}. You ${hasUserWon ? "won 🤑" : "lost 💸"}`,
      status: hasUserWon ? "success" : "error",
      duration: 1000,
    })
  }

  const handleCheckboxChange = (index: number, checked: boolean) => {
    const alreadyChecked = checkedItems.filter((check) => check === true).length
    if (checked && alreadyChecked > 2) return

    const newCheckedItems = [
      ...checkedItems.slice(0, index),
      checked,
      ...checkedItems.slice(index + 1),
    ]
    setCheckedItems(newCheckedItems)
  }

  useEffect(() => {
    if (WebApp.MainButton.isVisible)
      WebApp.MainButton.setText("Throw Dice 🎲").offClick(handleThrowDice).onClick(handleThrowDice)

    return () => {
      WebApp.MainButton.offClick(handleThrowDice)
    }
  }, [location.pathname, checkedItems, balance])

  return (
    <Flex style={WrapperStyle} direction="column">
      <Box style={DiceContainerStyle}>
        <Dice triggerRoll={triggerRoll} outputDice={outputDice} />
      </Box>
      <Box style={OptionsContainerStyle}>
        <Stack direction={["column", "row"]} style={StackStyle} pos={"relative"}>
          <InformationPopover
            style={{
              position: "absolute",
              top: "-25px",
              right: "0",
              color: "black",
            }}
          />
          <Grid templateColumns="repeat(3, 1fr)" gap={10}>
            {options.map((option, index) => {
              return (
                <Checkbox
                  iconColor="brand.100"
                  iconSize="1rem"
                  colorScheme={"red"}
                  isChecked={checkedItems[index]}
                  key={index}
                  value={option.value}
                  onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                >
                  <Text color={isDarkMode ? "brand.100" : "brand.900"}>{option.display}</Text>
                </Checkbox>
              )
            })}
          </Grid>
        </Stack>
      </Box>
    </Flex>
  )
}

export default DiceView
