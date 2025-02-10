import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: var(--background);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-direction: column;
  color: var(--black);

  span {
    font-size: .9rem;
  }
`;