import styled from 'styled-components'

export const Wrapper = styled.div`
  background: var(--background);
`

export const Navbar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background: var(--white);
  justify-content: space-between;
  padding: 0.5rem;
  color: var(--white);
  gap: 8px;

  > a {
    color: var(--white);
  }
  > a:hover {
    cursor: pointer;
  }

  #name-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    > span {
      font-size: 1.2rem;
      font-weight: bold;
    }

    > p {
      filter: brightness(0.6);
    }
  }

  a {
    cursor: pointer;
  }
`

export const TaskWrapper = styled.main`
  width: 100vw;
  flex-wrap: wrap;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max - width: 480px) {
    flex-direction: column;
    height: 80rem;
  }
`

export const ProjectTitle = styled.span`
  color: var(--gray);
  font-weight: bold;
  font-size: 18px;
`
