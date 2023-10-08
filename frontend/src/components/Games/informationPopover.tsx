import { InfoOutlineIcon } from "@chakra-ui/icons";
import { Box, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger } from "@chakra-ui/react";

export const InformationPopover: React.FC = () => {
  return <Box display={'flex'} justifyContent={'right'} paddingTop={'5px'} zIndex={99}>
    <Popover>
      <PopoverTrigger>
        <InfoOutlineIcon></InfoOutlineIcon>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>Every bet is 1€</PopoverBody>
      </PopoverContent>
    </Popover>
  </Box>;
}


