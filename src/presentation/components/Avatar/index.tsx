import { ComponentPropsWithoutRef } from "react";
import { Tooltip } from "../Tooltip";
import { StyledAvatar } from "./style";

type Props =  ComponentPropsWithoutRef<'img'> & {
  tooltip?: string;
}

export const Avatar = ({src, tooltip, style, alt}: Props) => {
  return (
    tooltip ? (
    <Tooltip text={tooltip}>
      <StyledAvatar alt={alt ?? ""} style={style} src={src} />
    </Tooltip>
    ) : (
    <StyledAvatar style={style} src={src} />
    )
  );
}