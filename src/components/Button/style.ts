import styled from 'styled-components';

export const ButtonStyled = styled.button`
    background: ${(props) => props.color || "var(--button)"};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.6rem;
    border-radius: 6px;
    width: 70%;

    transition: all 0.7s;

    color: var(--white);
    font-weight: 700;
    font-size: 1rem;

    margin: 1rem;

  }

  &:hover{
    filter: brightness(0.9);
    cursor: pointer;
  }
`;