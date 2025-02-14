import { Draggable, Droppable } from '@hello-pangea/dnd'
import { Task } from '../../../data/interfaces/task'
import { Row } from '../Layouts/Row'
import { CustomProgressBar } from '../ProgressBar'
import { TaskCard } from '../TaskCard'
import { TaskContainer, TaskContent } from './style'

type Props = {
  id: string
  taskList: Task[]
  percent: number
  title: string
}

export const TaskColumn = ({ id, taskList, percent, title }: Props) => {
  return (
    <Droppable droppableId={id}>
      {(provided: any) => (
        <TaskContainer percent={percent}>
          <CustomProgressBar
            style={{
              height: '40px',
              borderBottom: '1px solid var(--primary)',
              borderRadius: '8px 8px 0 0',
            }}
            percent={percent}
          >
            <Row id='header' fullWidth justifyContent='space-between'>
              <p>{title}</p>
              <p>{(percent * 100).toFixed(2)} %</p>
            </Row>
          </CustomProgressBar>

          <TaskContent {...provided.droppableProps} ref={provided.innerRef}>
            {taskList.map((task, index) => {
              return (
                <Draggable draggableId={task.id} key={task.id} index={index}>
                  {(provided: any) => (
                    <TaskCard
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      task={task}
                    />
                  )}
                </Draggable>
              )
            })}
          </TaskContent>
        </TaskContainer>
      )}
    </Droppable>
  )
}
