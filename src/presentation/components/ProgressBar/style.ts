import styled from "styled-components";

export const Bar = styled.div`
  width: 100%;
  height: 6px;
  border-radius: 8px;
  background-color: var(--white);
`;

type Props = {
  percent: number;
}

export const Progress = styled.div<Props>`
  width: ${props => props.percent + "%"};
  background: linear-gradient(36deg, red, pink, blue);
  height: 100%;
  border-radius: 8px;
`;