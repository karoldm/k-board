import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { BorderBackground, ContainerForm, Wrapper } from './style'

import { useNavigate } from 'react-router-dom'
import { useLogin } from '../../../data/repositories/userRepository'
import { useUser } from '../../../hooks/useUser'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Column } from '../../components/Layouts/Column'
import { loginSchema } from '../../schemas/login.schema'
import { handleError } from '../../utils/handleError'

type FormData = {
  email: string
  password: string
}
export const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  })

  const { mutateAsync, isPending } = useLogin()

  const navigate = useNavigate()
  const { setUserData } = useUser()

  const handleLogin = async (data: FormData) => {
    try {
      const user = await mutateAsync(data)
      setUserData(user)
      reset()
      navigate('/')
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <Wrapper>
      <BorderBackground>
        <ContainerForm>
          <span>
            Organize seus projetos usando quadros Kanban. <br />
            <br />
            Adicione nos seus projetos os membros que desejar de forma simples e
            rápida. <br />
            <br />
            Acompanhe seu progresso e tenha acesso a <i>insights</i> valiosos.
          </span>

          <Column
            as='form'
            onSubmit={handleSubmit((data) => handleLogin(data))}
            gap='16px'
            fullWidth
          >
            <Input
              error={errors.email?.message?.toString()}
              {...register('email')}
              placeholder='Email'
            />
            <Input
              error={errors.password?.message?.toString()}
              {...register('password')}
              type='password'
              placeholder='Senha'
            />
            <Button loading={isPending} type='submit'>
              <p>Entrar</p>
            </Button>
          </Column>

          <a href='/register'>Registrar-se</a>
        </ContainerForm>
      </BorderBackground>
    </Wrapper>
  )
}
