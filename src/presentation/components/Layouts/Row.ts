import styled from "styled-components";

type Props = {
  justifyContent?: "center" | "space-between" | "space-around" | "start" | "end";
  fullWidth?: boolean;
  gap?: string;
  wrap?: boolean;
}

export const Row = styled.div<Props>`
  width: ${props => props.fullWidth ? "100%" : "auto"};
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: ${props => props.wrap ? "wrap" : "nowrap"};
  gap: ${props => props.gap ?? 0};
  justify-content: ${props => props.justifyContent ?? "center"};
`;