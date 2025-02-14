import React from 'react'

import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import { useState } from 'react'
import { FaArrowLeft, FaInfo, FaPlus } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { Button } from '../../components/Button'
import { CustomModal } from '../../components/Modal'

import { Navbar, ProjectTitle, TaskWrapper, Wrapper } from './style'

import { taskStatusFromString } from '../../../data/enums/taskStatus'
import { Task, TaskPayload } from '../../../data/interfaces/task'
import { useProjectRespository } from '../../../data/repositories/projectRepository'
import { useTaskRepository } from '../../../data/repositories/taskRepository'
import { Row } from '../../components/Layouts/Row'
import { Loading } from '../../components/Loading'
import { InfoProjectModal } from '../../components/Modal/InfoProjectModal'
import { NewTaskModal } from '../../components/Modal/NewTaskModal'
import { Tag } from '../../components/Tag'
import { TaskColumn } from '../../components/TaskColumn'
import { WithCopy } from '../../components/WithCopy'
import { handleError } from '../../utils/handleError'
import { showToast } from '../../utils/showToast'

export const ProjectPage: React.FC = () => {
  const { id } = useParams()

  const [taskModal, setTaskModal] = useState(false)
  const [infoModal, setInfoModal] = useState(false)

  const [filter, setFilter] = useState('')

  const { getTasksByProjectQuery, editTaskMutation, createTaskMutation } =
    useTaskRepository({ projectId: id!, filter: filter })
  const { data: tasks, isLoading: taskLoading } = getTasksByProjectQuery

  const { getProjectByIdQuery } = useProjectRespository({ projectId: id! })
  const { data: project, isLoading: projectLoading } = getProjectByIdQuery

  const editTask = async (task: Task) => {
    try {
      await editTaskMutation.mutateAsync(task)
    } catch (error) {
      handleError(error)
    }
  }

  const handleDragEnd = async ({ source, destination }: DropResult<string>) => {
    if (!destination || !tasks) return

    const sourceKey = source.droppableId as keyof typeof taskStatusFromString
    const destinationKey =
      destination.droppableId as keyof typeof taskStatusFromString
    if (sourceKey === destinationKey) return

    const sourceList: Task[] =
      tasks![sourceKey.toLowerCase() as 'pending' | 'doing' | 'completed']
    const task = sourceList[source.index]
    if (!task) return

    tasks![sourceKey.toLowerCase() as 'pending' | 'doing' | 'completed'] =
      sourceList.filter((item) => item.id !== task.id)

    tasks![
      destinationKey.toLowerCase() as 'pending' | 'doing' | 'completed'
    ].push(task)

    task.taskStatus = taskStatusFromString[destinationKey]
    await editTask(task)
  }

  const handleDragStart = ({ ...args }) => {}

  const disableScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop)
    }
  }

  const onCreateTask = async (data: TaskPayload) => {
    try {
      await createTaskMutation.mutateAsync({
        projectId: id!,
        payload: data,
      })
      setTaskModal(false)
      showToast('Tarefa criada com sucesso!', 'success')
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <Wrapper>
      <CustomModal
        title='Nova Tarefa'
        visible={taskModal}
        onHide={() => {
          setTaskModal(false)
          window.onscroll = function () {}
        }}
      >
        <NewTaskModal project={project!} onConfirm={onCreateTask} />
      </CustomModal>

      <CustomModal
        title='Informações do Projeto'
        visible={infoModal}
        onHide={() => {
          setInfoModal(false)
          window.onscroll = function () {}
        }}
      >
        <InfoProjectModal project={project!} />
      </CustomModal>

      <Navbar>
        <Link to={'/'}>
          <FaArrowLeft color='#212121' />
        </Link>
        <Row wrap gap='8px'>
          <ProjectTitle>{project?.title}</ProjectTitle>
          <WithCopy text={id ?? ''}>
            <Tag size='small' label={id ?? ''} />
          </WithCopy>
        </Row>
        <Row gap='8px'>
          <Button
            onClick={() => {
              setTaskModal(true)
              disableScroll()
            }}
          >
            <FaPlus color='white' />
          </Button>
          <Button
            variant='secondary'
            onClick={() => {
              setInfoModal(true)
              disableScroll()
            }}
          >
            <FaInfo color='#CDCDCD' />
          </Button>
        </Row>
      </Navbar>

      <TaskWrapper>
        {taskLoading || projectLoading ? (
          <Loading variant='primary' />
        ) : (
          <DragDropContext
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
          >
            <TaskColumn
              id='PENDING'
              percent={
                tasks && tasks!.total > 0
                  ? tasks!.totalPending / tasks!.total
                  : 0
              }
              taskList={tasks?.pending ?? []}
              title='Pendente'
            />
            <TaskColumn
              id='DOING'
              percent={
                tasks && tasks!.total > 0 ? tasks!.totalDoing / tasks!.total : 0
              }
              taskList={tasks?.doing ?? []}
              title='Em progresso'
            />
            <TaskColumn
              id='COMPLETED'
              percent={
                tasks && tasks!.total > 0
                  ? tasks!.totalCompleted / tasks!.total
                  : 0
              }
              taskList={tasks?.completed ?? []}
              title='Concluídas'
            />
          </DragDropContext>
        )}
      </TaskWrapper>
    </Wrapper>
  )
}
