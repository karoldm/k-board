import Axios from 'axios'
import { useLocalStorage } from '../../hooks/useLocalStorage'

export const KBoardApi = () => {
  const instance = Axios.create({
    baseURL: process.env.REACT_APP_API_URL ?? 'http://localhost:8080',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  instance.interceptors.request.use((config) => {
    const { getItem } = useLocalStorage()
    const user = JSON.parse(getItem(process.env.REACT_APP_STORAGE_KEY ?? ''))

    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  })

  return instance
}
