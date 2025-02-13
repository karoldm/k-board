import styled from 'styled-components'

type Props = {
  justifyContent?: 'center' | 'space-between' | 'space-around' | 'start' | 'end'
  alignItems?: 'center' | 'start' | 'end'
  fullWidth?: boolean
  gap?: string
  fullHeight?: boolean
}

export const Column = styled.div<Props>`
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => props.gap ?? 0};
  justify-content: ${(props) => props.justifyContent ?? 'center'};
  align-items: ${(props) => props.alignItems ?? 'center'};
  height: ${(props) => (props.fullHeight ? '100%' : 'auto')};
`
