import styled from 'styled-components'

export const TaskContent = styled.div`
  overflow-y: scroll;
  height: 100%;
  padding: 8px;
  &::-webkit-scrollbar {
    width: 0;
  }
`

export const TaskContainer = styled.section<{ percent: number }>`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  margin: 0 8px;
  background: var(--white);
  height: 100%;
  border: 1px solid var(--primary);
  height: calc(100vh - 108px);

  #header {
    padding: 8px;
    position: absolute;
    inset: 0;

    > p {
      color: var(--blue-light);
      font-size: 14px;
      z-index: 999;
      font-weight: bold;
    }
  }

  @media (min-width: 621px) {
    flex: 1;
  }

  @media (max-width: 620px) {
    width: 100%;
    margin: 1rem 0;
  }
`
