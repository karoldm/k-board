import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';

import { ContainerForm, Wrapper, BorderBackground } from './style';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Column } from '../../components/Layouts/Column';
import { registerSchema } from '../../schemas/register.schema';

type FormData = {
  name: string;
  email: string;
  password: string;
  photo: File;
};

export const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = async (data: FormData) => {
    console.log(data);
    reset();
  }

  return (
    <Wrapper>
      <BorderBackground>
        <ContainerForm>
          <span>Registre-se e comece a organizar seus projetos :)</span>
          <Column
            as="form"
            onSubmit={handleSubmit((data) => handleRegister(data))} 
            gap="16px" 
            fullWidth
          >
            <Input
              error={errors.name?.message?.toString()}
              {...register('name')}
              max={60}
              type="text"
              id="name"
              placeholder='Nome'
            />
           <Input
            error={errors.email?.message?.toString()}
            {...register('email')}
            type="email"
            id="email"
            placeholder='Email'
           />
            <Input
              error={errors.password?.message?.toString()}
            {...register('password')}
              type="password"
              id="password"
              placeholder='Senha'
            />
            <Input
              error={errors.photo?.message?.toString()}
              {...register('photo')}
              type="file"
              id="photo"
              placeholder='Foto'
            />
            <Button type="submit">
              <p>Registrar</p>
            </Button>
          </Column>

          <a href="/login">Já tenho uma conta</a>
        </ContainerForm>
      </BorderBackground>
    </Wrapper >
  );
}