import { ComponentPropsWithoutRef } from 'react'
import { FaUser } from 'react-icons/fa'
import { Tooltip } from '../Tooltip'
import { StyledAvatar } from './style'

type Props = ComponentPropsWithoutRef<'img'> & {
  tooltip?: string
}

export const Avatar = ({ src, tooltip, style, alt }: Props) => {
  const AvatarComponent =
    src == '' ? (
      <StyledAvatar as='div' style={style}>
        <FaUser size={20} color='white' />
      </StyledAvatar>
    ) : (
      <StyledAvatar alt={alt ?? ''} style={style} src={src} />
    )

  return tooltip ? (
    <Tooltip text={tooltip}>{AvatarComponent}</Tooltip>
  ) : (
    AvatarComponent
  )
}
