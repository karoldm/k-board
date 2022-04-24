import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/Button';
import { ContainerRight, ContainerLeft, Wrapper, ButtonContent } from './style';

import { FaGoogle } from 'react-icons/fa';

import { auth, firebase } from '../../services/firebase';

import { useUser } from '../../hooks/useUser';

import userImage from '../../assets/user.png';


export const Login: React.FC = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

      if (result.user) {
        const { displayName, uid, photoURL } = result.user;

        if (displayName && photoURL) {
          login({
            name: displayName,
            id: uid,
            photoURL: photoURL,
          });

          navigate('/');
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Wrapper>
      <ContainerLeft></ContainerLeft>
      <ContainerRight>
        <img src={userImage} alt='logo icon' />
        <p> Entre com sua conta do Google</p>
        <Button onclick={handleLogin} >
          <ButtonContent>
            <FaGoogle />
            <div><p>Entrar</p></div>
          </ButtonContent>
        </Button>
      </ContainerRight>
    </Wrapper >
  );
}