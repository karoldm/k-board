import { forwardRef } from 'react'
import { FaTimes } from 'react-icons/fa'
import { Task } from '../../../data/interfaces/task'
import { Button } from '../Button'
import { Column } from '../Layouts/Column'
import { Row } from '../Layouts/Row'
import { MembersList } from '../MembersList'
import { Tag } from '../Tag'
import { TaskContainer } from './style'

type Props = {
  task: Task
  onRemove: () => void
}

export const TaskCard = forwardRef<HTMLDivElement, Props>(
  ({ task, onRemove, ...props }: Props, ref) => {
    return (
      <TaskContainer ref={ref} {...props} color={task.color}>
        <div id='task-color' />
        <Button
          id='close-button'
          onClick={() => onRemove()}
          variant='secondary'
          noBorder
          width='auto'
        >
          <FaTimes color='#CCC' size={12} />
        </Button>

        <Column
          justifyContent='start'
          alignItems='start'
          gap='4px'
          style={{ padding: '4px' }}
        >
          <p id='title'>{task.title}</p>
          <p id='description'>{task.description}</p>
          <Row justifyContent='start'>
            {task.tags.map((tag) => (
              <Tag size='small' key={tag} label={tag} />
            ))}
          </Row>
          <MembersList noToolTip members={task.members} />
        </Column>
      </TaskContainer>
    )
  }
)
