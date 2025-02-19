import Axios from 'axios'

export const KBoardApi = () => {
  const instance = Axios.create({
    baseURL: process.env.REACT_APP_API_URL ?? 'http://localhost:8080',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  instance.interceptors.request.use((config) => {
    const user = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_STORAGE_KEY ?? '') ?? `null`
    )
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  })

  return instance
}
