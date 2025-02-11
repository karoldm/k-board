import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { LoginPayload, RegisterPayload } from '../interfaces/auth'
import { User } from '../interfaces/user'
import { authService } from '../services/authService'

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: LoginPayload) => authService().login(payload),
    onError: (error: AxiosError) => {
      throw error
    },
    onSuccess: (data) => {
      const userData = data['user']
      const user: User = {
        id: userData['id'],
        name: userData['name'],
        email: userData['email'],
        token: data['token'],
        createdAt: userData['createdAt'],
        photoUrl: userData['photoUrl'],
      }
      return user
    },
  })
}

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService().register(payload),
    onError: (error: AxiosError) => {
      throw error
    },
  })
}
