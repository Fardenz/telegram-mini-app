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
import isDarkMode from "../../../helpers/isDarkMode"

const DiceView: React.FC = () => {
  const { getBalance } = useTelegramContext()

  const options = [1, 2, 3, 4, 5, 6]

  const [checkedItems, setCheckedItems] = useState(options.map(() => false))
  const [triggerRoll, setTriggerRoll] = useState<boolean>(false)
  const [outputDice, setOutputDice] = useState<number>(1)
  const showToast = useCustomToast()

  // Handle backend call
  const handleThrowDice = async () => {
    const opt = options.filter((val, idx) => checkedItems[idx] && val)
    if (opt.length < 1) {
      showToast({
        title: 'Please select at least one option',
        status: 'info'
      })
      return;
    }

    setTriggerRoll(true)

    const res: number | undefined = await GamesService.play(opt, "dice")

    if (!res) {
      setTriggerRoll(false)
      showToast({
        title: 'Something went wrong',
        status: 'error'
      })
      return;
    }

    setOutputDice(res)
    setTriggerRoll(false)
    await getBalance()
    const hasUserWon = opt.includes(res)
    showToast({
      title: `It was a ${res}. You ${hasUserWon ? "won" : "lost"}`,
      status: hasUserWon ? "success" : "error",
      duration: 1000,
    });
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
      WebApp.MainButton.setText("Throw Dice").offClick(handleThrowDice).onClick(handleThrowDice)

    return () => {
      WebApp.MainButton.offClick(handleThrowDice)
    }
  }, [location.pathname, checkedItems])

  return (
    <Flex style={WrapperStyle} direction="column">
      <InformationPopover />
      <Box style={DiceContainerStyle}>
        <Dice triggerRoll={triggerRoll} outputDice={outputDice} />
      </Box>
      <Box style={OptionsContainerStyle}>
        <Stack direction={["column", "row"]} style={StackStyle}>
          <Grid templateColumns="repeat(3, 1fr)" gap={10}>
            {options.map((option, index) => {
              return (
                <Checkbox
                  isChecked={checkedItems[index]}
                  color={isDarkMode ? "brand.100" : "brand.900"}
                  key={index}
                  value={option}
                  onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                >
                  <Text color="black">{option}</Text>
                </Checkbox>
              )
            })}
          </Grid>
        </Stack>
      </Box>
    </Flex >
  )
}

export default DiceView
