import { PropsWithChildren } from 'react'
import { StyledProgressBar } from './style'

type Props = {
  percent: number
  style?: React.CSSProperties
}

export const CustomProgressBar = ({
  percent,
  style,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <StyledProgressBar label={children} style={style} now={percent * 100} />
  )
}
