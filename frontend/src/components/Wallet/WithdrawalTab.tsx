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

  const isValidIBAN = (iban: string) => {
    const ibanRegex = /^[A-Za-z]{2}\d{2}\s?(\w{4}\s?){1,7}\w{1,3}?$/;
    return ibanRegex.test(iban);
  };

  const isValidAmount = (amount: string) => {
    const floatRegex = /^-?\d+(?:[.,]\d*?)?$/;
    return floatRegex.test(amount) && parseFloat(amount) >= 0;
  };

  return (
    <VStack spacing={4}>
      <Input
        type="text"
        placeholder="Enter IBAN"
        pattern="[A-Za-z]{2}\d{2}\s?(\w{4}\s?){1,7}\w{1,3}?"
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
        isDisabled={!isValidIBAN(value) || !isValidAmount(numberValue)}
      >
        Withdraw
      </Button>
    </VStack>
  );
};

export default WithdrawalTab;
