import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { BorderBackground, ContainerForm, Wrapper } from './style'

import { AxiosError } from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../../../data/services/auth'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Column } from '../../components/Layouts/Column'
import { registerSchema } from '../../schemas/register.schema'
import { showToast } from '../../utils/showToast'

type FormData = {
  name: string
  email: string
  password: string
}

export const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  })

  const [file, setFile] = useState<File | undefined>()

  const navigate = useNavigate()

  const handleRegister = async (data: FormData) => {
    try {
      await authService().register({ ...data, photo: file })
      showToast('Conta criada com sucesso!', 'success')
      reset()
      navigate('/login')
    } catch (error) {
      const errorData = (error as AxiosError)?.response?.data as {
        message: string
        status: string
      }

      showToast(
        'Tivemos um problema ao criar sua conta: ' +
          (errorData.message || 'Erro desconhecido'),
        'error'
      )
    }
  }

  return (
    <Wrapper>
      <BorderBackground>
        <ContainerForm>
          <span>Registre-se e comece a organizar seus projetos :)</span>
          <Column
            as='form'
            onSubmit={handleSubmit((data) => handleRegister(data))}
            gap='16px'
            fullWidth
          >
            <Input
              error={errors.name?.message?.toString()}
              {...register('name')}
              max={60}
              type='text'
              placeholder='Nome'
            />
            <Input
              error={errors.email?.message?.toString()}
              {...register('email')}
              type='email'
              placeholder='Email'
            />
            <Input
              error={errors.password?.message?.toString()}
              {...register('password')}
              type='password'
              placeholder='Senha'
            />
            <Input
              type='file'
              placeholder='Foto'
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFile(e.target.files[0])
                }
              }}
            />
            <Button type='submit'>
              <p>Registrar</p>
            </Button>
          </Column>

          <a href='/login'>Já tenho uma conta</a>
        </ContainerForm>
      </BorderBackground>
    </Wrapper>
  )
}
