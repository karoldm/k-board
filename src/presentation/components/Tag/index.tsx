import { Wrapper } from "./style";

type Props = {
  label: string;
  color?: string;
  size?: "large" | "medium" | "small";
}

export const Tag = ({label, color, size="medium"}: Props) => {
  return(
    <Wrapper color={color} size={size}>
      <p>
        {label}
      </p>
    </Wrapper>
  );
}