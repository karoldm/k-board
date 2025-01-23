import { Tooltip } from "../Tooltip";
import { StyledAvatar } from "./style";

type Props = {
  src: string;
  tooltip?: string;
  style?: React.CSSProperties;
}

export const Avatar = ({src, tooltip, style}: Props) => {
  return (
    tooltip ? (
    <Tooltip text={tooltip}>
      <StyledAvatar style={style} src={src} />
    </Tooltip>
    ) : (
    <StyledAvatar style={style} src={src} />
    )
  );
}