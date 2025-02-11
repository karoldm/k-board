import { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { LoginPayload } from '../data/interfaces/auth'
import { User } from '../data/interfaces/user'
import { authService } from '../data/services/auth'
import { useLocalStorage } from '../hooks/useLocalStorage'

export const UserContext = createContext({} as UserContextType)

type UserContextType = {
  userData: User | undefined
  login: (payload: LoginPayload) => Promise<void>
  logout: () => void
  isAuth: () => boolean
}

const KEY = process.env.REACT_APP_STORAGE_KEY ?? ''

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [userData, setUserData] = useState<User | undefined>()
  const { saveItem, getItem, removeItem } = useLocalStorage()

  useEffect(() => {
    if (userData) {
      saveItem(KEY, userData)
    }
  }, [userData])

  useEffect(() => {
    const storageUser: User = getItem(KEY)
    setUserData(storageUser)
  }, [])

  const logout = () => {
    removeItem(KEY)
  }

  const login = async (payload: LoginPayload) => {
    const userData = await authService().login(payload)
    setUserData(userData)
  }

  const isAuth = () => userData != null

  return (
    <UserContext.Provider value={{ userData, login, logout, isAuth }}>
      {children}
    </UserContext.Provider>
  )
}
