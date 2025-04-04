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

  instance.interceptors.response.use(function (config) {
    return config;
  }, function (error) {
    if(error.status == 401){
      localStorage.removeItem(process.env.REACT_APP_STORAGE_KEY ?? "")
      window.location.href = "/"
    }
    return Promise.reject(error)
  });

  return instance
}
