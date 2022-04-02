import { Wrapper } from './style';

type Props = {
  background?: string,
  name: string,
  deleteTask: () => void,
}

export const Task = ({ background, name, deleteTask }: Props) => {
  return (
    <Wrapper color={background}>
      <button onClick={deleteTask}>X</button>
      <p>{name}</p>
    </Wrapper>
  );
}