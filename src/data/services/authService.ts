import { LoginPayload, RegisterPayload } from '../interfaces/auth'
import { KBoardApi } from './kboardApi'

class AuthService {
  async login(payload: LoginPayload) {
    try {
      const result = await KBoardApi().post('/auth/login', payload)
      return result.data
    } catch (error) {
      console.error('Login API error:', error)
      throw error
    }
  }

  async register(payload: RegisterPayload) {
    try {
      const formData = new FormData()
      formData.append('email', payload.email)
      formData.append('password', payload.password)
      formData.append('name', payload.name)
      if (payload.photo) {
        formData.append('photo', payload.photo)
      }

      const result = await KBoardApi().post('/auth/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      return result.data
    } catch (error) {
      console.error('Register API error:', error)
      throw error
    }
  }
}

export const authService = new AuthService()
