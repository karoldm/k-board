import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { LoginPayload, RegisterPayload } from '../interfaces/auth'
import { userMock } from '../mocks/userMock'
import { authService } from '../services/authService'

export const useUserRepository = () => {
  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => {
      return authService.login(payload)
    },
    onError: (error: AxiosError) => {
      throw error
    },
    onSuccess: (data) => {
      // const userData = data['user']
      // const user: User = {
      //   id: userData['id'],
      //   name: userData['name'],
      //   email: userData['email'],
      //   token: data['token'],
      //   createdAt: userData['createdAt'],
      //   photoUrl: userData['photoUrl'],
      // }
      // return user
    },
  })

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterPayload) => {
      return Promise.resolve(userMock)
    },
    onError: (error: AxiosError) => {
      throw error
    },
  })

  return {
    loginMutation,
    registerMutation,
  }
}
