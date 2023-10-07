import React from "react";
import { Input, Button, VStack } from "@chakra-ui/react";

interface TopUpTabProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const TopUpTab: React.FC<TopUpTabProps> = ({ value, onChange, onSubmit }) => {

  const isValidFloat = (val: string) => {
    const floatRegex = /^-?\d+(?:[.,]\d*?)?$/;
    if (!floatRegex.test(val)) return false;

    return parseFloat(val) >= 0;
  };

  return (
    <VStack spacing={4}>
      <Input
        type="number"
        placeholder="Enter amount"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Button
        onClick={onSubmit}
        isDisabled={!isValidFloat(value) || value === ""}
      >
        Top up
      </Button>
    </VStack>
  );
};

export default TopUpTab;
