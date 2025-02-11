import Axios from 'axios'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useUser } from '../../hooks/useUser'

export const KBoardApi = () => {
  const { getItem } = useLocalStorage()
  const { logout } = useUser()

  const user = getItem(process.env.REACT_APP_STORAGE_KEY ?? '') ?? null

  const instance = Axios.create({
    baseURL: process.env.REACT_APP_API_URL ?? 'http://localhost:8080',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  instance.interceptors.request.use((config) => {
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  })

  instance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response) {
        const { status } = error.response

        if (status === 401 || status === 403) {
          console.log('Unauthorized or Forbidden, redirecting to login...')
          logout()
        }
      }

      return Promise.reject(error)
    }
  )

  return instance
}
