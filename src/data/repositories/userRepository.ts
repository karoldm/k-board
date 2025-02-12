import { useMutation } from '@tanstack/react-query'
import { LoginPayload, RegisterPayload } from '../interfaces/auth'
import { userMapper } from '../mappers/userMapper'
import { authService } from '../services/authService'

export const useUserRepository = () => {
  const loginMutation = useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const data = await authService.login(payload)
      return userMapper(data)
    },
  })

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterPayload) => {
      return authService.register(payload)
    },
  })

  return {
    loginMutation,
    registerMutation,
  }
}
