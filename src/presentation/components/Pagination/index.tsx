import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { Button } from '../Button'
import { Row } from '../Layouts/Row'
import { TextStyled } from './style'

type Props = {
  current: number
  onChangePage: (value: number) => void
  total: number
  hasNext: boolean
}

export const Pagination = ({
  current,
  onChangePage,
  total,
  hasNext,
}: Props) => {
  return (
    <Row gap='8px'>
      <Button
        disabled={current == 0}
        onClick={() => onChangePage(current - 1)}
        variant='icon'
      >
        <FaArrowLeft size={12} color='gray' />
      </Button>
      <TextStyled>
        {current + 1} de {total}
      </TextStyled>
      <Button
        disabled={!hasNext}
        onClick={() => onChangePage(current + 1)}
        variant='icon'
      >
        <FaArrowRight size={12} color='gray' />
      </Button>
    </Row>
  )
}
