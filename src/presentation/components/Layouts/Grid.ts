import styled from "styled-components";

type Props = {
  columns: string;
  rows: string;
}

export const Grid = styled.div<Props>`
  display: grid;
  grid-template-columns: ${props => props.columns};
  grid-template-rows: ${props => props.rows};
  gap: 16px;
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;