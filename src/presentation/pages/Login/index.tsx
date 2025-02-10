import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';

import { ContainerForm, Wrapper, BorderBackground } from './style';

import { loginSchema } from '../../schemas/login.schema';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Column } from '../../components/Layouts/Column';

type FormData = {
  email: string;
  password: string;
};
export const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: FormData) => {
    console.log(data);
    reset();
  }

  return (
    <Wrapper>
      <BorderBackground>
        <ContainerForm>
          <span>
            Organize seus projetos usando quadros Kanban. <br/><br/> 
            Adicione nos seus projetos os membros que desejar de forma simples e rápida. <br/><br/>
            Acompanhe seu progresso e tenha acesso a <i>insights</i> valiosos.
          </span>
          
          <Column
            as="form"
            onSubmit={handleSubmit((data) => handleLogin(data))}
            gap="16px"
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
              type="password"
              placeholder='Senha'
            />
            <Button type="submit">
              <p>Entrar</p>
            </Button>
          </Column>

          <a href="/register">Registrar-se</a>
        </ContainerForm>
      </BorderBackground>
    </Wrapper >
  );
}