import { zodResolver } from '@hookform/resolvers/zod'
import { FieldValues, useForm } from 'react-hook-form'
import { newProjectSchema } from '../../../schemas/project.schema'
import { Button } from '../../Button'
import { Input } from '../../Input'
import { Column } from '../../Layouts/Column'

type Props = {
  initialValue?: string
  handleConfirm: (title: string) => void
}

export const NewProjectModal = ({ handleConfirm, initialValue }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newProjectSchema),
  })

  const handleSave = async (data: FieldValues) => {
    handleConfirm(data.title)
    reset()
  }

  return (
    <Column
      as='form'
      onSubmit={handleSubmit((data) => handleSave(data))}
      gap='8px'
    >
      <Input
        defaultValue={initialValue}
        placeholder='Título'
        error={errors.title?.message?.toString()}
        {...register('title')}
      />
      <Button type='submit'>
        <p>Salvar</p>
      </Button>
    </Column>
  )
}
