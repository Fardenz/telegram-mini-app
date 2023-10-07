import React, { useState } from "react";
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

} from "@chakra-ui/react";
import TopUpTab from "./TopUpTab";
import WithdrawalTab from "./WithdrawalTab";
import Wallet from "@services/wallet";
import { useTelegramContext } from "@contexts/telegramContext";
import { useCustomToast } from "@helpers/toastUtil";

interface WalletModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
    const [isloading, setIsLoading] = useState(false);
    const [topUpValue, setTopUpValue] = useState("");
    const [ibanValue, setIbanValue] = useState("");
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const { getBalance } = useTelegramContext();
    const showToast = useCustomToast();


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Wallet</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {isloading ?
                        <Spinner />
                        :
                        <Tabs isFitted variant="enclosed">
                            <TabList mb="1em">
                                <Tab>Top up</Tab>
                                <Tab>Withdrawal</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <TopUpTab
                                        value={topUpValue}
                                        onChange={setTopUpValue}
                                        onSubmit={async () => {
                                            setIsLoading(true);
                                            await Wallet.createPaymentLink({ amount: parseFloat(topUpValue) }, getBalance, showToast)
                                            setTopUpValue("")
                                            setIsLoading(false);
                                            onClose()
                                        }}
                                    />
                                </TabPanel>
                                <TabPanel>
                                    <WithdrawalTab
                                        value={ibanValue}
                                        numberValue={withdrawAmount}
                                        onChange={setIbanValue}
                                        onNumberChange={setWithdrawAmount}
                                        onSubmit={async () => {
                                            setIsLoading(true);
                                            await Wallet.withdrawal({ amount: parseFloat(withdrawAmount), iban: ibanValue }, getBalance, showToast)
                                            setIbanValue("")
                                            setWithdrawAmount("")
                                            setIsLoading(false);
                                            onClose()
                                        }}
                                    />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    }
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default WalletModal;
