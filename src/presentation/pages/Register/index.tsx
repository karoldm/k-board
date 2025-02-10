import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { ContainerForm, Wrapper, BorderBackground } from './style';

import { useUser } from '../../../hooks/useUser';
import { userMock } from '../../../data/mocks/userMock';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Column } from '../../components/Layouts/Column';

export const Register = () => {
  const {  } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
    
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Wrapper>
      <BorderBackground>
        <ContainerForm>
          <span>Registre-se e comece a organizar seus projetos :)</span>
          <Column as="form" gap="16px" fullWidth>
            <Input required type="text" id="name" placeholder='Nome' value={email} setValue={setEmail} />
            <Input required type="email" id="email" placeholder='Email' value={password} setValue={setPassword} />
            <Input required type="password" id="password" placeholder='Senha' value={password} setValue={setPassword} />
            <Input type="file" id="photo" placeholder='Foto' value={password} setValue={setPassword} />
            <Button type="submit" onClick={()=>{}}>
              <p>Registrar</p>
            </Button>
          </Column>

          <a href="/login">Já tenho uma conta</a>
        </ContainerForm>
      </BorderBackground>
    </Wrapper >
  );
}