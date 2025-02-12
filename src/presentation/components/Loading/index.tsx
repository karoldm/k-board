import { Spinner } from 'react-bootstrap'

export const Loading = ({ color = 'white' }: { color?: string }) => {
  return <Spinner color={color} animation='border' role='status' />
}
