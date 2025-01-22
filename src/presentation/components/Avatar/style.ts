import styled from 'styled-components';

type Props = {
  src: string;
  width?: string;
}

export const Avatar = styled.img<Props>`
  border-radius: 100%;
  width: ${props => props.width ?? "40px"};
  height: ${props => props.width ?? "40px"};
  background: var(--primary);
  border: 2px solid var(--white);
`