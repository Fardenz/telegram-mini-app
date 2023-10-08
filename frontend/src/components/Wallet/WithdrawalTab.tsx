import React from "react"
import { Input, Button, VStack } from "@chakra-ui/react"
import isDarkMode from "@helpers/isDarkMode"
import { ButtonRoundedStyle, FocusInputStyle, InputStyle } from "./styles"

interface WithdrawalTabProps {
  value: string
  numberValue: string
  onChange: (value: string) => void
  onNumberChange: (value: string) => void
  onSubmit: () => void
}

const WithdrawalTab: React.FC<WithdrawalTabProps> = ({
  value,
  numberValue,
  onChange,
  onNumberChange,
  onSubmit,
}) => {
  const isValidAmount = (amount: string) => {
    const floatRegex = /^-?\d+(?:[.,]\d*?)?$/
    return floatRegex.test(amount) && parseFloat(amount) >= 0
  }

  return (
    <VStack spacing={4}>
      <Input
        style={InputStyle}
        _placeholder={InputStyle}
        _focus={FocusInputStyle}
        type="text"
        placeholder="Enter Bank Account Number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Input
        type="number"
        style={InputStyle}
        _placeholder={InputStyle}
        _focus={FocusInputStyle}
        placeholder="Enter Amount"
        value={numberValue}
        onChange={(e) => onNumberChange(e.target.value)}
      />
      <Button
        onClick={onSubmit}
        isDisabled={!isValidAmount(numberValue) || value.length == 0}
        style={ButtonRoundedStyle}
      >
        Withdraw
      </Button>
    </VStack>
  )
}

export default WithdrawalTab
