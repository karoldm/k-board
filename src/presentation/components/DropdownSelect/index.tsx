import { Form } from 'react-bootstrap'

type Option<T> = {
  value: T
  label: string
}

type Props<T> = {
  options: Option<T>[]
  onSelect: (value: Option<T>) => void
}

export const DropdownSelect = <T extends string | number>({
  options,
  onSelect,
}: Props<T>) => {
  return (
    <Form.Select
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = options.find(
          (option) => option.value.toString() === e.target.value
        )
        if (selectedOption) {
          onSelect(selectedOption)
        }
      }}
      style={{ color: 'var(--gray)', fontSize: '.9rem' }}
    >
      <option>Selecione os responsáveis da tarefa</option>
      {options.map((option) => (
        <option key={option.value.toString()} value={option.value.toString()}>
          {option.label}
        </option>
      ))}
    </Form.Select>
  )
}
