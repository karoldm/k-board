import styled from "styled-components";

export const ModalInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  text-align: center;

  strong {
    font-size: 1.2rem;
  }

  p {
    color: gray;
  }

  img {
    border-radius: 100%;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  div > img {
    width: 50%;
  }
`;