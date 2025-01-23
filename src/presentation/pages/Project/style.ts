import styled from 'styled-components';


export const Wrapper = styled.div`
  height: 100vh;
  background: var(--background);
`;

export const Navbar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background: var(--white);
  justify-content: space-between;
  padding: .5rem;
  color: var(--white);
  > a {
    color: var(--white);
  }
  >a:hover{
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
`;

export const ModalInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  text-align: center;

  strong {
    font-size: 1.2rem;
  }

  p {
    color: gray;
  }

  img {
    border-radius: 100%;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  div > img {
    width: 50%;
  }
`;

export const ModalTaskContent = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

font-size: 1.2rem;
font-weight: bold;

  > span {
  margin-bottom: 2rem;
}

  > div {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space - between;
  gap: 1rem;

    > input[type = "color"] {
    border: none;
    background: var(--white);
    height: 2.5rem;
  }
}
`;

export const TaskWrapper = styled.main`
width: 100vw;
display: flex;
flex-wrap: wrap;
padding: 24px;

@media(max - width: 480px) {
  flex-direction: column;
  height: 80rem;
}
`;

export const ProjectTitle = styled.span`
  color: var(--gray);
  font-weight: bold;
  font-size: 18px;
`;
