import { Background, ModalStyled, Wrapper } from './style';

type Props = {
  children: JSX.Element,
  visible: boolean,
  onHide: () => void,
}

export const Modal = ({ children, visible, onHide }: Props) => {
  return (
    <Wrapper style={visible ? { display: 'flex' } : { display: 'none' }}>
      <Background onClick={onHide} />
      <ModalStyled>
        {children}
      </ModalStyled>
    </Wrapper>
  );
}