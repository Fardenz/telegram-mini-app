import React from "react"
import { Input, Button, VStack } from "@chakra-ui/react"
import { ButtonRoundedStyle, FocusInputStyle, InputStyle } from "./styles"

interface TopUpTabProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
}

const TopUpTab: React.FC<TopUpTabProps> = ({ value, onChange, onSubmit }) => {
  const isValidFloat = (val: string) => {
    const floatRegex = /^-?\d+(?:[.,]\d*?)?$/
    if (!floatRegex.test(val)) return false

    return parseFloat(val) >= 0
  }

  return (
    <VStack spacing={4}>
      <Input
        style={InputStyle}
        _placeholder={InputStyle}
        _focus={FocusInputStyle}
        type="number"
        placeholder="Enter amount"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Button
        style={ButtonRoundedStyle}
        onClick={onSubmit}
        isDisabled={!isValidFloat(value) || value === ""}
      >
        Top up
      </Button>
    </VStack>
  )
}

export default TopUpTab
