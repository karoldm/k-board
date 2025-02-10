import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { ContainerForm, Wrapper, BorderBackground } from './style';

import { useUser } from '../../../hooks/useUser';
import { userMock } from '../../../data/mocks/userMock';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Column } from '../../components/Layouts/Column';

export const Login = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // const result = await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

      // if (result.user) {
      //   const { displayName, uid, photoURL } = result.user;

      //   if (displayName && photoURL) {
          login(userMock);

          navigate('/');
        // }
    //   }
    } catch (error) {
      console.error(error);
    }
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
          
          <Column gap="16px" fullWidth>
            <Input id="email" placeholder='Email' value={email} setValue={setEmail} />
            <Input id="password" placeholder='Senha' value={password} setValue={setPassword} />
            <Button onclick={()=>{}}>
              <p>Entrar</p>
            </Button>
          </Column>

          <a>Registrar-se</a>
        </ContainerForm>
      </BorderBackground>
    </Wrapper >
  );
}