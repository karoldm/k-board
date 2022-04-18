import { createContext, ReactNode, useEffect, useState } from 'react';
import { auth } from '../services/firebase';

export const UserContext = createContext({} as UserContextType);

type UserContextType = {
  user: User | undefined,
  login: (userData: User) => void,
  logout: () => void,
  isAuth: () => boolean,
}

type User = {
  name: string,
  id: string,
  photoURL: string,
}

type Props = {
  children: ReactNode;
}

/******************** Local Storage ************************/
const saveItem = (token: string, user: User) => {
  try {
    const JSONUser = JSON.stringify(user);
    localStorage.setItem(token, JSONUser);
  } catch (error) {
    console.error(error);
  }
}

const getItem = (token: string) => {
  try {
    const result = localStorage.getItem(token);
    return JSON.parse(result!);
  } catch (error) {
    console.error(error);
  }
}

const removeItem = (token: string) => {
  try {
    localStorage.removeItem(token);
  } catch (error) {
    console.error(error);
  }
}

const TOKEN = 'user@token';

/*********************************************************/

export const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (user) {
      saveItem(TOKEN, user);
    }
  }, [user]);

  useEffect(() => {
    const storageUser: User = getItem(TOKEN);
    setUser(storageUser);
  }, []);

  const logout = () => {
    removeItem(TOKEN);
    auth.signOut();
  }

  const login = (userData: User) => {
    setUser(userData);
  }

  const isAuth = () => {
    const result = getItem(TOKEN);

    if (!result) return false;

    return true;

  }

  return (
    <UserContext.Provider value={{ user, login, logout, isAuth }} >
      {children}
    </UserContext.Provider>
  );
}