import React, { useState } from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Spinner,
} from "@chakra-ui/react"
import TopUpTab from "./TopUpTab"
import WithdrawalTab from "./WithdrawalTab"
import Wallet from "@services/wallet"
import { useTelegramContext } from "@contexts/telegramContext"
import { useCustomToast } from "@helpers/toastUtil"
import { BackgroundModalStyle, BorderStyle, TabSelectedStyle } from "./styles"

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const [isloading, setIsLoading] = useState(false)
  const [topUpValue, setTopUpValue] = useState("")
  const [ibanValue, setIbanValue] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const { getBalance } = useTelegramContext()
  const showToast = useCustomToast()

  const handleTopUpTab = async () => {
    setIsLoading(true)
    await Wallet.createPaymentLink({ amount: parseFloat(topUpValue) }, getBalance, showToast)
    setTopUpValue("")
    setIsLoading(false)
    onClose()
  }

  const handleWithdrawalTab = async () => {
    setIsLoading(true)
    await Wallet.withdrawal(
      { amount: parseFloat(withdrawAmount), iban: ibanValue },
      getBalance,
      showToast
    )
    setIbanValue("")
    setWithdrawAmount("")
    setIsLoading(false)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent style={BackgroundModalStyle}>
        <ModalHeader>Wallet</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isloading ? (
            <Spinner />
          ) : (
            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab _selected={TabSelectedStyle} style={BorderStyle}>
                  Top up
                </Tab>
                <Tab _selected={TabSelectedStyle} style={BorderStyle}>
                  Withdrawal
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <TopUpTab value={topUpValue} onChange={setTopUpValue} onSubmit={handleTopUpTab} />
                </TabPanel>
                <TabPanel>
                  <WithdrawalTab
                    value={ibanValue}
                    numberValue={withdrawAmount}
                    onChange={setIbanValue}
                    onNumberChange={setWithdrawAmount}
                    onSubmit={handleWithdrawalTab}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default WalletModal
