import { Spinner, SpinnerProps } from 'react-bootstrap'

export const Loading = ({
  variant = 'light',
}: {
  variant?: SpinnerProps['variant']
}) => {
  return (
    <Spinner size='sm' variant={variant} animation='border' role='status' />
  )
}
