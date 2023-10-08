import React from "react";
import { Input, Button, VStack } from "@chakra-ui/react";

interface WithdrawalTabProps {
  value: string;
  numberValue: string;
  onChange: (value: string) => void;
  onNumberChange: (value: string) => void;
  onSubmit: () => void;
}

const WithdrawalTab: React.FC<WithdrawalTabProps> = ({
  value,
  numberValue,
  onChange,
  onNumberChange,
  onSubmit
}) => {

  const isValidAmount = (amount: string) => {
    const floatRegex = /^-?\d+(?:[.,]\d*?)?$/;
    return floatRegex.test(amount) && parseFloat(amount) >= 0;
  };

  return (
    <VStack spacing={4}>
      <Input
        type="text"
        placeholder="Enter Bank Account Number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Enter Amount"
        value={numberValue}
        onChange={(e) => onNumberChange(e.target.value)}
      />
      <Button
        onClick={onSubmit}
        isDisabled={!isValidAmount(numberValue)}
      >
        Withdraw
      </Button>
    </VStack>
  );
};

export default WithdrawalTab;
