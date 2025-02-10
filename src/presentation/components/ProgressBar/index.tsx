import { Bar, Progress } from "./style";

type Props = {
  percent: number;
}

export const ProgressBar = ({percent}: Props) => {
  return (
    <Bar>
      <Progress percent={percent} />
    </Bar>
  );
}