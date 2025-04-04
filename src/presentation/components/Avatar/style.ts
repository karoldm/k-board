import styled from 'styled-components'

type Props = {
  image?: String
  width?: string
  editable: boolean
}

export const StyledAvatar = styled.div<Props>`
  border-radius: 100%;
  width: ${(props) => props.width ?? '40px'};
  height: ${(props) => props.width ?? '40px'};
  background: ${(props) => props.image ? 'transparent' : 'var(--primary)'};
  background-image: ${(props) => props.image ? `url('${props.image}')` : 'none'};
  background-size: cover;
  background-position: center;
  border: 2px solid var(--white);
  display: flex;
  align-items: end;
  justify-content: end;
  overflow: hidden;
  cursor: pointer;

  .avatar-edit {
    display: ${(props) => (props.editable ? 'flex' : 'none')};
    height: 24%;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
