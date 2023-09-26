import { createContext, useContext, useEffect, useMemo, useState } from "react"
import SuperFetch from "../infrastructure/superFetch"
import { WebApp } from "@grammyjs/web-app"

interface AuthContextType {
  userData: WebAppInitData
}

const emptyAuthContext: AuthContextType = {
  userData: { hash: '', auth_date: 0},
}

const AuthContext: React.Context<AuthContextType> = createContext<AuthContextType>(emptyAuthContext)

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const emptyUserData: WebAppInitData = { hash: '', auth_date: 0}
  const [userData, setUserData] = useState<WebAppInitData>(emptyUserData)

  useEffect(() => {
    WebApp.ready()
    setUserData(WebApp.initDataUnsafe)
    SuperFetch.setToken(WebApp.initData)
  }, [])

  const value = useMemo(
    () => ({
      userData,
    }),
    [userData]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuthContext = () => {
  return useContext(AuthContext)
}

export { AuthContextProvider, useAuthContext }
