import styled from 'styled-components'

export const TaskContainer = styled.div<{ color: string }>`
  width: 100%;
  min-height: auto;
  background: var(--background);
  border: 1px solid var(--primary);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-bottom: 8px;

  #close-button {
    position: absolute;
    right: 0px;
    top: 8px;
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

  #task-color {
    height: 8px;
    width: 100%;
    background: ${(props) => props.color};
  }
`
