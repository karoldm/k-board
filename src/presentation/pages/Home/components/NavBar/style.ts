import { styled } from 'styled-components'

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
    gap: 8px;
  }
`
