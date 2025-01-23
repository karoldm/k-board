import { getColorByContrast } from "../../utils/color";
import { Wrapper } from "./style";

type Props = {
  label: string;
  color?: string;
  size?: "large" | "medium" | "small";
  onClick?: () => void;
}

export const Tag = ({label, color, size="medium", onClick}: Props) => {
  return(
    <Wrapper onClick={onClick} style={onClick ? {cursor: 'pointer'} : {}} color={color} size={size}>
      <p style={color != null ? {color: getColorByContrast(color)} : {}}>
        {label}
      </p>
    </Wrapper>
  );
}