import { Draggable, Droppable } from '@hello-pangea/dnd'
import { Task } from '../../../data/interfaces/task'
import { Row } from '../Layouts/Row'
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
          <Row justifyContent='space-between' id='header'>
            <p>{title}</p>
            <p>{percent * 100} %</p>
          </Row>
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
