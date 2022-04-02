import { InputStyled } from './style';

type Props = {
  placeholder: string,
  setValue: (value: string) => void,
  id: string,
  value: string,
}

export const Input = ({ placeholder, setValue, id, value }: Props) => {
  return (
    <InputStyled
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
      id={id}
      value={value}
    />
  );
}