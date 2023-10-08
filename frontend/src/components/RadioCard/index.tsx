import { Box, useRadio } from "@chakra-ui/react"
import { RadioCheckedStyle, RadioFocusStyle, RadioStyle } from "./style"

const RadioCard = (props: any) => {
  const { getInputProps, getRadioProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getRadioProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        style={RadioStyle}
        _checked={RadioCheckedStyle}
        _selected={RadioCheckedStyle}
        _focus={RadioFocusStyle}
      >
        {props.children}
      </Box>
    </Box>
  )
}

export default RadioCard
