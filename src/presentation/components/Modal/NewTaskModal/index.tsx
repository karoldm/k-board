import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { FaPlus } from 'react-icons/fa'
import { Project } from '../../../../data/interfaces/project'
import { TaskPayload } from '../../../../data/interfaces/task'
import { useTaskReducer } from '../../../../hooks/useTaskReducer'
import { taskSchema } from '../../../schemas/task.schema'
import { Button } from '../../Button'
import { DropdownSelect } from '../../DropdownSelect'
import { Input } from '../../Input'
import { Column } from '../../Layouts/Column'
import { Row } from '../../Layouts/Row'
import { Tag } from '../../Tag'
import { ModalTaskContent } from './style'

type FormData = {
  title: string
  description: string
  color: string
}

type Props = {
  onConfirm: (task: TaskPayload) => void
  project: Project
}

export const NewTaskModal = ({ onConfirm, project }: Props) => {
  const { task, dispatch } = useTaskReducer()
  const [tagText, setTagText] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(taskSchema),
  })

  const onSubmit = (data: FormData) => {
    reset()
    onConfirm({
      ...data,
      tags: task.tags,
      members: task.members.map((member) => member.id),
    })
    dispatch({
      type: 'reset',
      payload: undefined,
    })
  }

  const handleAddTag = () => {
    if (tagText.trim().length === 0) return
    dispatch({ type: 'add-tag', payload: tagText })
    setTagText('')
  }

  return (
    <ModalTaskContent as='form' onSubmit={handleSubmit(onSubmit)} gap='8px'>
      <Column alignItems='start' fullWidth gap='8px'>
        <Input
          error={errors.title?.message}
          {...register('title')}
          placeholder='Tarefa'
          setValue={(value) => dispatch({ type: 'title', payload: value })}
        />
        <Input
          error={errors.description?.message}
          {...register('description')}
          placeholder='Descrição'
          setValue={(value) =>
            dispatch({ type: 'description', payload: value })
          }
        />
        <Row gap='8px'>
          <input
            {...register('color')}
            type='color'
            onChange={(e) =>
              dispatch({ type: 'color', payload: e.target.value })
            }
          />
          <Tag color={task.color} label={task.color} />
        </Row>
      </Column>

      <Row gap='8px' fullWidth>
        <Input value={tagText} placeholder='Tag' setValue={setTagText} />
        <Button type='button' width='auto' onClick={handleAddTag}>
          <FaPlus size={18} color='white' />
        </Button>
      </Row>

      <Row wrap gap='8px'>
        {task.tags.map((tag) => (
          <Tag
            onRemove={() => {
              dispatch({ type: 'remove-tag', payload: tag })
            }}
            key={tag}
            size='small'
            label={tag}
          />
        ))}
      </Row>

      <DropdownSelect
        options={project.members.map((member) => ({
          value: member.id,
          label: member.name,
        }))}
        onSelect={(option) => {
          dispatch({
            type: 'add-member',
            payload: { id: option.value, name: option.label },
          })
        }}
      />

      <Row fullWidth wrap gap='8px'>
        {task.members.map((member) => (
          <Tag
            onRemove={() =>
              dispatch({ type: 'remove-member', payload: member })
            }
            key={member.id}
            size='small'
            label={member.name}
          />
        ))}
      </Row>

      <Button type='submit'>
        <p>Criar</p>
      </Button>
    </ModalTaskContent>
  )
}
