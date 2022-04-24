import styled from 'styled-components';


export const Wrapper = styled.div`
  height: 100%;
`;

export const Navbar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background: var(--primary);
  justify-content: space-between;
  padding: 1.5rem;
  color: var(--white);

  @media (max-width: 480px){
    flex-direction: column;
    gap: 1.5rem;
  }

  > a {
    color: var(--white);
  }
  >a:hover{
    cursor: pointer;
  }

  #button-div {
    display: flex;
    gap: 1rem;
    
    > button {
      background: var(--button);
      border-radius: 20px;
      padding: 0.5rem 1.2rem;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      font-size: 1rem;
      font-weight: bold;
  
      &:hover {
        filter: brightness(0.9);
        cursor: pointer;
      }
    }
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
height: 32rem;
display: flex;
flex-wrap: wrap;

padding: 0 2rem;

@media(max - width: 480px) {
  flex-direction: column;
  height: 80rem;
}
`;

export const TaskContent = styled.div`
overflow-y: scroll;
height: 100%;

  &:: -webkit-scrollbar {
  width: 6px;
}
  &:: -webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2)
} 
  &:: -webkit-scrollbar-thumb {
  background-color: var(--primary);
  border-radius: 8px;
}
`;

export const TaskContainer = styled.section`
border: 1px solid var(--black);
display: flex;
flex-direction: column;
border-radius: 8px;
margin: 1rem 2rem;

height: 100%;

@media (min-width: 621px){
  flex: 1;
}

@media (max-width: 620px){
  width: 100%;
  margin: 1rem 0;
}

  .title-task-container {
  background: var(--primary);
  color: var(--white);
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  padding: 1rem;
  border-radius: 6px 6px 0 0;
}

`;


export const Task = styled.div`
cursor: pointer;

padding: 0.5rem 1rem 2rem 1rem;
background: ${(props) => props.color};
display: flex;
flex-direction: column;
align-items: center;
color: var(--white);
font-size: 1rem;

gap: 0.5rem;

border-radius: 8px;
margin: 0.5rem;

  > p{
  width: 100%;
}

  > button{
  background: transparent;
  border: none;
  color: var(--white);
  margin-left: auto;
}

  > button:hover{
  cursor: pointer;
}
`;