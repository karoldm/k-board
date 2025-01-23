import styled from 'styled-components';

type Props = {
  width?: string;
  variant?: 'primary' | 'secondary';
  noBorder: boolean;
}

export const ButtonStyled = styled.button<Props>`
    background: ${props => props.variant == 'primary' ? 'var(--blue-primary);' : 'var(--background);'};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border-radius: 8px;
    width: ${props => props.width ?? "100%"};
    transition: all 0.7s;
    color: var(--black);
    border: ${props => props.noBorder ? 0 : '1px'} solid ${props => props.variant == 'primary' ? 'var(--blue-primary);' : 'var(--primary);'};
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