import styled from "styled-components";

export const TaskContainer = styled.div<{color: String}>`
  width: 100%;
  height: auto;
  background: var(--background);
  border: 1px solid var(--primary);
  border-top: 6px solid ${props => props.color};
  border-radius: 8px;
  padding: 4px;
  gap: 8px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;

  #close-button {
    position: absolute;
    right: 0px;
    top: 0px;
  }

  #title {
    font-size: 16px;
    font-weight: bold;
    color: var(--gray);
  }

  #description {
    font-size: 14px;
    color: var(--gray-light);
  }
`;