import { ComponentPropsWithoutRef, PropsWithChildren } from 'react'
import { Spinner } from 'react-bootstrap'

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
  if (variant == 'secondary') {
    return (
      <SecondaryButton
        disabled={loading}
        noBorder={noBorder}
        width={width}
        {...props}
      >
        {loading ? <Spinner animation='border' role='status' /> : children}
      </SecondaryButton>
    )
  }

  if (variant == 'icon') {
    return (
      <IconButton disabled={loading} noBorder={true} width={width} {...props}>
        {loading ? <Spinner animation='border' role='status' /> : children}
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
      {loading ? <Spinner animation='border' role='status' /> : children}
    </PrimaryButton>
  )
}
