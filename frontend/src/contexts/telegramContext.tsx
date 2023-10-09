import { createContext, useContext, useEffect, useMemo, useState } from "react"
import SuperFetch from "@infrastructure/superFetch"
import { WebApp } from "@grammyjs/web-app"
import { useLocation } from "react-router-dom"
import Wallet from "@services/wallet"
import { useCustomToast } from "@helpers/toastUtil"

interface TelegramContextType {
  userData: WebAppInitData
  getBalance: () => Promise<void>
  balance: number | null
}

const emptyTelegramContext: TelegramContextType = {
  userData: { hash: "", auth_date: 0 },
  getBalance: async () => {},
  balance: null,
}

const TelegramContext: React.Context<TelegramContextType> =
  createContext<TelegramContextType>(emptyTelegramContext)

interface TelegramProviderProps {
  children: React.ReactNode
}

const TelegramContextProvider: React.FC<TelegramProviderProps> = ({ children }) => {
  const emptyUserData: WebAppInitData = { hash: "", auth_date: 0 }
  const [userData, setUserData] = useState<WebAppInitData>(emptyUserData)
  const [balance, setBalance] = useState<number | null>(null)
  const [hasExpanded, setHasExpanded] = useState<boolean>(false)

  if (!hasExpanded && !window.Telegram.WebApp.isExpanded) {
    setHasExpanded(true)
    window.Telegram.WebApp.expand()
  }

  const showToast = useCustomToast()
  const getBalance = async () => {
    const res = await Wallet.getBalance(showToast)
    if (!res && res !== 0) return
    setBalance(res)
  }

  useEffect(() => {
    WebApp.ready()
    setUserData(WebApp.initDataUnsafe)
    SuperFetch.setToken(WebApp.initData)
  }, [])

  return (
    <TelegramContext.Provider value={{ userData, getBalance, balance }}>
      {children}
    </TelegramContext.Provider>
  )
}

const useTelegramContext = () => {
  return useContext(TelegramContext)
}

export { TelegramContextProvider, useTelegramContext }
