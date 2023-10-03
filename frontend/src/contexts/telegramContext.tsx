import { createContext, useContext, useEffect, useMemo, useState } from "react"
import SuperFetch from "@infrastructure/superFetch"
import { WebApp } from "@grammyjs/web-app"

interface TelegramContextType {
  userData: WebAppInitData
}

const emptyTelegramContext: TelegramContextType = {
  userData: { hash: '', auth_date: 0},
}

const TelegramContext: React.Context<TelegramContextType> = createContext<TelegramContextType>(emptyTelegramContext)

interface TelegramProviderProps {
  children: React.ReactNode
}

const TelegramContextProvider: React.FC<TelegramProviderProps> = ({ children }) => {
  const emptyUserData: WebAppInitData = { hash: '', auth_date: 0}
  const [userData, setUserData] = useState<WebAppInitData>(emptyUserData)

  useEffect(() => {
    WebApp.ready()
    setUserData(WebApp.initDataUnsafe)
    SuperFetch.setToken(WebApp.initData)
    console.log('entra')
  }, [])

  const value = useMemo(
    () => ({
      userData,
    }),
    [userData]
  )

  return <TelegramContext.Provider value={value}>{children}</TelegramContext.Provider>
}

const useTelegramContext = () => {
  return useContext(TelegramContext)
}

export { TelegramContextProvider, useTelegramContext }