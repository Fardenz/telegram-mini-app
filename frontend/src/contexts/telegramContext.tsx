import { createContext, useContext, useEffect, useMemo, useState } from "react"
import SuperFetch from "@infrastructure/superFetch"
import { WebApp } from "@grammyjs/web-app"
import { useLocation } from "react-router-dom"
import Wallet from "@services/wallet"

interface TelegramContextType {
  userData: WebAppInitData
  getBalance: () => Promise<void>
  balance: number
}

const emptyTelegramContext: TelegramContextType = {
  userData: { hash: "", auth_date: 0 },
  getBalance: async () => {},
  balance: 0,
}

const TelegramContext: React.Context<TelegramContextType> =
  createContext<TelegramContextType>(emptyTelegramContext)

interface TelegramProviderProps {
  children: React.ReactNode
}

const TelegramContextProvider: React.FC<TelegramProviderProps> = ({ children }) => {
  const emptyUserData: WebAppInitData = { hash: "", auth_date: 0 }
  const [userData, setUserData] = useState<WebAppInitData>(emptyUserData)
  const [balance, setBalance] = useState<number>(0)

  const getBalance = async () => {
    const res = await Wallet.getBalance()
    if (!res) return console.error("Something went wrong")
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
