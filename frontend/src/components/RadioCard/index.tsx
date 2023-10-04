import { Box, useRadio } from "@chakra-ui/react"

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
        borderWidth="1px"
        borderRadius="md"
        color="black"
        w="100px"
        alignContent="center"
        justifyContent="center"
        display="flex"
        boxShadow="md"
        _checked={{
          bg: "telegram.500",
          color: "white",
          borderColor: "telegram.500",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}

export default RadioCard
