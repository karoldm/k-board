import Axios from 'axios'

export const KBoardApi = () =>
  Axios.create({
    baseURL: process.env.REACT_APP_API_URL ?? 'http://localhost:8080',
    headers: {
      'Content-Type': 'application/json',
    },
  })
