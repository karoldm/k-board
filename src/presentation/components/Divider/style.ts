import styled from 'styled-components';

type Props = {
  color?: string;
  type: "horizontal" | "vertical";
}

export const StyledDivider = styled.div<Props>`
  width: ${(props) => props.type == "vertical" ? "1px" : "100%"};
  height: ${(props) => props.type == "horizontal" ? "1px" : "100%"};

  margin: ${(props) => props.type == "vertical" ? "0 1rem" : "1rem 0" };
  background: ${(props) => props.color || "var(--primary)"};
`;