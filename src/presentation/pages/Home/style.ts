import styled from 'styled-components';

export const Nav = styled.nav`
  width: 100%;
  background: var(--white);
  display: flex;
  gap: 48%;
  align-items: center;
  height: auto;
  top: 0;
  padding: 8px 16px;

  @media (max-width: 768px) {
    gap: 16%;
  }
`;

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  gap: 16px;
  align-items: start;
  flex-direction: column;
  background: var(--background);
`;


export const Container = styled.div`
  background: var(--white);
  padding: 32px;
  border-radius: 8px;

  .text {
    color: var(--black);
    letter-spacing: 1px;
    font-size: 16px;
    font-weight: bold;
  }
`;