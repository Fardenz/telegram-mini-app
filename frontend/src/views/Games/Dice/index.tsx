// Coinflip component

import React, { useState } from "react"
import { Box, Button, Checkbox, Flex, Grid, Stack, Text } from "@chakra-ui/react"
import Dice from "@components/Dice"
import GamesService from "@services/games"

const DiceView: React.FC = () => {
  const options = [1, 2, 3, 4, 5, 6] // Coin options duh
  const [checkedItems, setCheckedItems] = useState(options.map(() => false))
  const [triggerRoll, setTriggerRoll] = useState<boolean>(false)
  const [outputDice, setOutputDice] = useState<number>(1)

  // Handle backend call
  const handleThrowDice = async () => {
    const opt = options.filter((val, idx) => checkedItems[idx] && val)
    console.log(opt)

    if (opt.length < 3) return alert("Please select 3 options")

    setTriggerRoll(true)

    const res: number | undefined = await GamesService.playDice(opt, "dice")
    console.log(res)

    if (!res) {
      setTriggerRoll(false)
      return alert("Something went wrong")
    }

    setOutputDice(res)
    setTriggerRoll(false)
  }

  return (
    <Flex direction="column" align="center" maxW={{ xl: "1200px" }} m="0 auto" h="100%" px="10%">
      <Box
        w="100%"
        h="50%"
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Dice triggerRoll={triggerRoll} outputDice={outputDice} />
      </Box>
      <Box
        w="100%"
        h="30%"
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack
          spacing={[1, 5]}
          direction={["column", "row"]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          w="100%"
        >
          <Grid templateColumns="repeat(3, 1fr)" gap={10}>
            {options.map((option, index) => {
              return (
                <Checkbox
                  isChecked={checkedItems[index]}
                  color="telegram"
                  key={index}
                  value={option}
                  onChange={(e) => {
                    const checked = checkedItems.filter((check) => check === true).length
                    if (e.target.checked && checked > 2) return
                    setCheckedItems([
                      ...checkedItems.slice(0, index),
                      e.target.checked,
                      ...checkedItems.slice(index + 1),
                    ])
                  }}
                >
                  <Text color="black">{option}</Text>
                </Checkbox>
              )
            })}
          </Grid>
        </Stack>
      </Box>
      <Box w="100%" h="20%" display="flex" alignContent="center" justifyContent="center" pt="20px">
        <Button onClick={handleThrowDice}>Throw dice</Button>
      </Box>
    </Flex>
  )
}

export default DiceView
