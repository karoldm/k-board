import styled from "styled-components";
import { Column } from "../../Layouts/Column";


export const ModalTaskContent = styled(Column)`
  > span {
    margin-bottom: 2rem;
  }

  input[type="color"] {
    cursor: pointer;
    height: 32px;
    border: none;
    outline: none;
    border-radius: 4px;
  }

  input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  input[type="color"]::-webkit-color-swatch {
      border: none;
  }

  #text-button {
    color: var(--white);
    font-size: 14px;
    font-weight: bold;
  }
`;