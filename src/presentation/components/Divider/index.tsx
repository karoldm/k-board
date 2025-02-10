import React, { PropsWithChildren } from "react";
import { StyledDivider } from "./style";

type Props = {
  type: "horizontal" | "vertical",
  color?: "string"
}

export const Divider = ({ type, color}: Props) => {
  return (
    <StyledDivider color={color} type={type} />
  );
}