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
      <Button onClick={onSubmit}>
        Withdraw
      </Button>
    </VStack>
  );
};

export default WithdrawalTab;
