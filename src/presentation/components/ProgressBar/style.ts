import { ProgressBar } from 'react-bootstrap'
import { styled } from 'styled-components'

type Props = {
  height?: string
  borderRadius?: string
}

export const StyledProgressBar = styled(ProgressBar)<Props>`
  width: 100%;
  height: ${(props) => props.height ?? '8px'};
  position: relative;
  background: var(--background);

  .progress-bar {
    background: var(--blue-primary);
  }
`
