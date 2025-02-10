import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: var(--background);
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  justify-content: center;

  span {
    font-weight: bold;
    font-size: 1.5rem;
  }

  p {
    font-size: .9rem;
    font-weight: 500;
  }
`;