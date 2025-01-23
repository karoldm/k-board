import styled from "styled-components";


export const ModalTaskContent = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

font-size: 1.2rem;
font-weight: bold;

  > span {
  margin-bottom: 2rem;
}

  > div {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space - between;
  gap: 1rem;

    > input[type = "color"] {
    border: none;
    background: var(--white);
    height: 2.5rem;
  }
}
`;