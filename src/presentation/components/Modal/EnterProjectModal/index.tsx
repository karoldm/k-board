import { zodResolver } from '@hookform/resolvers/zod'
import { FieldValues, useForm } from 'react-hook-form'
import { enterProjectSchema } from '../../../schemas/project.schema'
import { Button } from '../../Button'
import { Input } from '../../Input'
import { Column } from '../../Layouts/Column'

type Props = {
  handleConfirm: (id: string) => void
  loading: boolean
}

export const EnterProjectModal = ({ handleConfirm, loading }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(enterProjectSchema),
  })

  const handleSave = async (data: FieldValues) => {
    handleConfirm(data.id)
    reset()
  }

  return (
    <Column
      as='form'
      onSubmit={handleSubmit((data) => handleSave(data))}
      gap='8px'
    >
      <Input
        placeholder='ID do Projeto'
        error={errors.id?.message?.toString()}
        {...register('id')}
      />
      <Button loading={loading} type='submit'>
        <p>Participar</p>
      </Button>
    </Column>
  )
}
