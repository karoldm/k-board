import { LoginPayload, RegisterPayload } from '../interfaces/auth'
import { User } from '../interfaces/user'
import { KBoardApi } from './kboardApi'

export const authService = () => {
  const login = async (payload: LoginPayload) => {
    try {
      const result = await KBoardApi().post('/auth/login', payload)

      const data = result.data
      const userData = data['user']

      return {
        id: userData['id'],
        name: userData['name'],
        email: userData['email'],
        token: data['token'],
        createdAt: userData['createdAt'],
        photoUrl: userData['photoUrl'],
      } as User
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const register = async (payload: RegisterPayload) => {
    try {
      const formData = new FormData()
      formData.append('email', payload.email)
      formData.append('password', payload.password)
      formData.append('name', payload.name)
      if (payload.photo) {
        formData.append('photo', payload.photo)
      }

      const result = await KBoardApi().post('/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      const data = result.data

      return {
        id: data['id'],
        name: data['name'],
        email: data['email'],
        createdAt: data['createdAt'],
        photoUrl: data['photoUrl'],
      } as User
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return {
    login,
    register,
  }
}
