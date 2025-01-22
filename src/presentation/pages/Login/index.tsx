import React from 'react';

import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/Button';
import { ContainerForm, Wrapper, ButtonContent, BorderBackground } from './style';

import { FaGoogle } from 'react-icons/fa';

import { auth, firebase } from '../../../data/services/firebase';

import { useUser } from '../../../hooks/useUser';
import { userMock } from '../../../data/mocks/userMock';

export const Login: React.FC = () => {
  const { login } = useUser();
  const navigate = useNavigate();

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
          {/* <img src="./assets/user.png" alt='logo icon' /> */}
          <Button onclick={handleLogin} >
            <ButtonContent>
              <FaGoogle id="icon" />
              <p>Entrar com o Google</p>
            </ButtonContent>
          </Button>
        </ContainerForm>
      </BorderBackground>
    </Wrapper >
  );
}