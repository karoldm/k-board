import { useContext } from 'react';
import { UserContext } from '../context/userContext';

export const useUser = () => {
  const value = useContext(UserContext);
  return value;
}