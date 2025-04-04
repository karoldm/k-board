import styled from "styled-components";

export const Wrapper = styled.main`
  width: 100vw;
  height: 100vh;
  background: var(---background);
`;

export const Nav = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  background: var(--white);
  justify-content: space-between;
  padding: 0.5rem;
  color: var(--white);
  gap: 8px;
  position: fixed;
  top: 0;

  > a {
    color: var(--white);
  }
  > a:hover {
    cursor: pointer;
  }
`;