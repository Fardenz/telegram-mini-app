import { InfoOutlineIcon } from "@chakra-ui/icons"
import {
  Box,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react"
import isDarkMode from "@helpers/isDarkMode"

type InformationPopoverProps = {
  style?: React.CSSProperties;
}

export const InformationPopover: React.FC<InformationPopoverProps> = ({ style }) => {
  return (
    <Box display={"flex"} justifyContent={"right"} paddingTop={"5px"} zIndex={99} style={style}>
      <Popover>
        <PopoverTrigger>
          <InfoOutlineIcon color={isDarkMode ? "whiteAlpha.900" : "black"}></InfoOutlineIcon>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>Every bet is 1€</PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  )
}
