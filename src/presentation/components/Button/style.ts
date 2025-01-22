import styled from 'styled-components';

type Props = {
  width?: string;
  borderColor?: string;
}

export const ButtonStyled = styled.button<Props>`
    background: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border-radius: 8px;
    width: ${props => props.width ?? "100%"};
    transition: all 0.7s;
    color: var(--black);
    border: 1px solid ${props => props.borderColor ?? "var(--primary)"};
  }

  &:hover{
    filter: brightness(0.98);
    cursor: pointer;
  }

  &:active {
    filter: brightness(0.93);
    cursor: pointer;
  }
`;