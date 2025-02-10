import styled from 'styled-components';

type Props = {
  width?: string;
  noBorder: boolean;
}

export const ButtonStyled = styled.button<Props>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border-radius: 8px;
    width: ${props => props.width ?? "100%"};
    color: var(--black);
    border: ${props => props.noBorder ? 0 : '1px'} solid;

    p{
      font-size: 14px;
      font-weight: bold;
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

export const PrimaryButton = styled(ButtonStyled)`
  background: var(--blue-primary);
  border-color: var(--blue-primary);
  p {
    color: var(--white);
  }
`;

export const SecondaryButton = styled(ButtonStyled)`
  background: var(--background);
  border-color: var(--primary);

  p {
    color: var(--gray);
  }
`;

export const IconButton = styled(ButtonStyled)`
  background: transparent;
  border-color: transparent;
  padding: 0;
  width: ${props => props.width ?? "auto"};
`;