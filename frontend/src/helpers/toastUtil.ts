import { useToast } from "@chakra-ui/react"

export type ToastOptions = {
  title: string
  description?: string
  status?: "success" | "error" | "warning" | "info"
  duration?: number
  isClosable?: boolean
}

export const useCustomToast = () => {
  const toast = useToast()

  const showToast = ({
    title,
    description = "",
    status = "info",
    duration = 3000,
    isClosable = true,
  }: ToastOptions) => {
    toast({
      title,
      description,
      status,
      duration,
      isClosable,
      position: "bottom",
    })
  }

  return showToast
}
