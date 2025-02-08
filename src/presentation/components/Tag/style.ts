import styled from "styled-components";
import { paddingConstants } from "../../constants/padding";

type Props = {
  size: "large" | "medium" | "small";
  color?: string;
}

export const Wrapper = styled.div<Props>`
  border-radius: 32px;
  padding: ${props => paddingConstants[props.size]};
  background-color: ${props => props.color ?? "var(--white)"};
  border: 1px solid ${props => props.color ?? "var(--primary)"};
  
  p {
    color: var(--gray);
    font-size: 14px;
    font-weight: bold;
  }
`;  