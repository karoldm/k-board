import styled from 'styled-components'
import { Column } from '../Layouts/Column'

export const InputStyled = styled.input`
  color: var(--black);
  border: 1px solid var(--primary);
  outline: none;
  border-radius: 6px;
  padding: 0.5rem;
  width: 100%;
  font-size: 0.9rem;
  max-height: 32px;
`

export const InputStyledFile = styled.input`
  color: var(--black);
  border: 1px solid var(--primary);
  outline: none;
  border-radius: 6px;
  padding: 0.5rem;
  width: 100%;
  font-size: 0.9rem;
`

export const StyledColumn = styled(Column)`
  .error-message {
    color: var(--red);
    font-size: 14px;
    text-align: start;
    width: 100%;
  }
`
