import { useNavigate } from 'react-router-dom'
import { Button } from '../Button'
import { Wrapper } from './style'

export const ErrorFallback = ({ error }: { error: Error }) => {
  const navigate = useNavigate()

  return (
    <Wrapper>
      <span>Ops! Parece que algo deu errado.</span>
      <p>{error.message}</p>
      <Button
        width='240px'
        onClick={() => {
          navigate('/')
        }}
      >
        <p>Voltar página inicial</p>
      </Button>
    </Wrapper>
  )
}
