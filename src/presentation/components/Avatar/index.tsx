import { ComponentPropsWithoutRef } from 'react'
import { FaEdit, FaUser } from 'react-icons/fa'
import { Tooltip } from '../Tooltip'
import { StyledAvatar } from './style'

type Props = ComponentPropsWithoutRef<'div'> & {
  tooltip?: string
  image?: String
  editable?: boolean
  onImageClick?: () => void
}

export const Avatar = ({ image, tooltip, style, editable=false, onImageClick }: Props) => {
  const AvatarComponent =
    (!image || image == '') ? (
      <StyledAvatar
        onClick={onImageClick}
        editable={editable} 
        style={style}
      >
        <FaUser size={20} color='white' />
        <div className='avatar-edit'>
          <FaEdit size={16} color='white' />
        </div>
      </StyledAvatar>
    ) : (
      <StyledAvatar
        onClick={onImageClick}
        editable={editable} 
        style={style} 
        image={image}
      >
        <div className='avatar-edit'>
          <FaEdit size={16} color='white' />
        </div>
      </StyledAvatar>
    )

  return tooltip ? (
    <Tooltip text={tooltip}>
      {AvatarComponent}
    </Tooltip>
  ) : (
    AvatarComponent
  )
}
