import React, { createContext, useEffect, useState, PropsWithChildren } from 'react';
import { User } from '../data/interfaces/user';
import { loginService, logoutService } from '../data/services/auth';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const UserContext = createContext({} as UserContextType);

type UserContextType = {
  userData: User | undefined,
  login: (userData: User) => void,
  logout: () => void,
  isAuth: () => boolean,
}

const TOKEN = "KBOARD@USER";

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [userData, setUserData] = useState<User>();
  const { saveItem, getItem, removeItem } = useLocalStorage();

  useEffect(() => {
    if (userData) {
      saveItem(TOKEN, userData);
    }
  }, [userData]);

  useEffect(() => {
    const storageUser: User = getItem(TOKEN);
    setUserData(storageUser);
  }, []);

  const logout = () => {
    removeItem(TOKEN);
    logoutService();
  }

  const login = (data: User) => {
    //const userData = loginService();
    setUserData(data);
  }

  const isAuth = () => {
    const result = getItem(TOKEN);

    return result != null;
  }

  return (
    <UserContext.Provider value={{ userData, login, logout, isAuth }} >
      {children}
    </UserContext.Provider>
  );
}