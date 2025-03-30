import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { User } from '../../../../data/interfaces/user'
import { newProjectSchema } from '../../../schemas/project.schema'
import { Button } from '../../Button'
import { Input } from '../../Input'
import { Column } from '../../Layouts/Column'
import { Row } from '../../Layouts/Row'
import { Tag } from '../../Tag'

type Props = {
  initialValue?: {
    title: string
    members: User[]
  }
  handleConfirm: (title: string, members: string[]) => void
  loading: boolean
}

export const NewProjectModal = ({ handleConfirm, initialValue, loading }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newProjectSchema),
  })

  const [members, setMembers] = useState(initialValue?.members || [])
  const [membersToRemove, setMembersToRemove] = useState<string[]>([])

  const handleSave = async (data: FieldValues) => {
    handleConfirm(data.title, membersToRemove)
    reset()
  }

  return (
    <Column
      as='form'
      onSubmit={handleSubmit((data) => handleSave(data))}
      gap='8px'
    >
      <Input
        defaultValue={initialValue?.title}
        placeholder='Título'
        error={errors.title?.message?.toString()}
        {...register('title')}
      />
      <Row fullWidth wrap gap='8px'>
        {members.map((member) => (
          <Tag
            onRemove={() => {
              setMembers((prev) => prev.filter((m) => m.id !== member.id))
              setMembersToRemove((prev) => [...prev, member.id])
            }}
            key={member.id}
            size='small'
            label={member.name}
          />
        ))}
      </Row>
      <Button loading={loading} type='submit'>
        <p>Salvar</p>
      </Button>
    </Column>
  )
}
