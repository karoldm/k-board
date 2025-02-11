import { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { User } from '../data/interfaces/user'
import { useLocalStorage } from '../hooks/useLocalStorage'

export const UserContext = createContext({} as UserContextType)

type UserContextType = {
  userData: User | undefined
  setUserData: React.Dispatch<React.SetStateAction<User | undefined>>
  logout: () => void
  isAuth: () => boolean
}

const KEY = process.env.REACT_APP_STORAGE_KEY ?? ''

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const { saveItem, getItem, removeItem } = useLocalStorage()
  const [userData, setUserData] = useState<User | undefined>(getItem(KEY))

  useEffect(() => {
    if (userData) {
      saveItem(KEY, userData)
    }
  }, [userData])

  const logout = () => {
    removeItem(KEY)
  }

  const isAuth = () => userData != null

  return (
    <UserContext.Provider value={{ userData, setUserData, logout, isAuth }}>
      {children}
    </UserContext.Provider>
  )
}
