import { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../data/interfaces/userAuth'
import { useLocalStorage } from '../hooks/useLocalStorage'

export const UserContext = createContext({} as UserContextType)

type UserContextType = {
  userData: UserAuth | undefined
  setUserData: React.Dispatch<React.SetStateAction<UserAuth | undefined>>
  clearUserData: () => void
  isAuth: () => boolean
}

const KEY = process.env.REACT_APP_STORAGE_KEY ?? ''

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const { saveItem, getItem, removeItem } = useLocalStorage()
  const [userData, setUserData] = useState<UserAuth | undefined>(getItem(KEY))
  const navigate = useNavigate()

  useEffect(() => {
    if (userData) {
      saveItem(KEY, userData)
    }
  }, [userData])

  const clearUserData = () => {
    removeItem(KEY)
    setUserData(undefined)
    navigate('/login')
  }

  const isAuth = () => userData != null

  return (
    <UserContext.Provider
      value={{ userData, setUserData, clearUserData, isAuth }}
    >
      {children}
    </UserContext.Provider>
  )
}
