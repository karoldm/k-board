import { ComponentPropsWithoutRef, PropsWithChildren } from 'react'
import { Loading } from '../Loading'

import { IconButton, PrimaryButton, SecondaryButton } from './style'

type Props = ComponentPropsWithoutRef<'button'> & {
  width?: string
  variant?: 'primary' | 'secondary' | 'icon'
  noBorder?: boolean
  loading?: boolean
}

export const Button = ({
  children,
  width,
  noBorder = false,
  variant = 'primary',
  loading,
  ...props
}: PropsWithChildren<Props>) => {
  const child = loading ? <Loading /> : children

  if (variant == 'secondary') {
    return (
      <SecondaryButton
        disabled={loading}
        noBorder={noBorder}
        width={width}
        {...props}
      >
        {child}
      </SecondaryButton>
    )
  }

  if (variant == 'icon') {
    return (
      <IconButton disabled={loading} noBorder={true} width={width} {...props}>
        {child}
      </IconButton>
    )
  }

  return (
    <PrimaryButton
      disabled={loading}
      noBorder={noBorder}
      width={width}
      {...props}
    >
      {child}
    </PrimaryButton>
  )
}
