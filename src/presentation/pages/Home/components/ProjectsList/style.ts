import { styled } from 'styled-components'

export const Container = styled.div`
  background: var(--white);
  padding: 32px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  .text {
    color: var(--black);
    letter-spacing: 1px;
    font-size: 16px;
    font-weight: bold;
  }
`
