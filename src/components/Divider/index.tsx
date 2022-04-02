import React from "react";
import { Wrapper } from "./style";

type Props = {
  color?: string,
  children: string,
}

export const Divider = ({ children, color }: Props) => {
  return (
    <Wrapper color={color}>
      <div></div>
      <p>{children}</p>
      <div></div>
    </Wrapper>
  );
}