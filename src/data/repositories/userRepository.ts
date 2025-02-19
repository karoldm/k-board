import { useMutation } from '@tanstack/react-query'
import { LoginPayload, RegisterPayload } from '../interfaces/auth'
import { userMapper } from '../mappers/userMapper'
import { authService } from '../services/authService'

export const useLogin = () => {
  return useMutation({
    mutationFn: async (payload: LoginPayload) =>
      userMapper(await authService.login(payload)),
  })
}

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
  })
}
