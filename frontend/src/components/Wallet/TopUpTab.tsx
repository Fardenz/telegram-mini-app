import React from "react";
import { Input, Button } from "@chakra-ui/react";

interface TopUpTabProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const TopUpTab: React.FC<TopUpTabProps> = ({ value, onChange, onSubmit }) => {
  return (
    <>
      <Input
        type="number"
        placeholder="Enter amount"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Button mt={4} onClick={onSubmit}>
        Top up
      </Button>
    </>
  );
};

export default TopUpTab;
