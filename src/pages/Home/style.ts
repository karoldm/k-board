import styled from 'styled-components';

export const ContainerLeft = styled.section`
  background: var(--primary);

  flex: 4;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 1rem;

  overflow-y: scroll;

  &::-webkit-scrollbar { 
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0,0,0,0.2)
  } 
  &::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 8px;
  }
`;

export const ContainerLabelButton = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  >input{
    flex: 4;
  }

  >button{
    flex: 1;
  }
`;

export const ContainerRight = styled.section`

  > img {
    border-radius: 50%;
    margin: 1rem 0;
    border: 3px solid var(--primary);
  }

  >strong {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  background: var(--white);
  flex: 3;
  min-height: 100vh;
  
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  
  > div {

    @media (max-width: 480px){
      width: 100%;
    }

    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-size: 1.2rem;
    text-align: center;

    gap: 1rem;

    > label {
      margin-bottom: 0.5rem;
    }
  }

  #exit-button {
    background: transparent;
    color: var(--black);
    font-size: 1rem;

    &:hover{
      cursor: pointer;
    }
  }
`;

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;

  @media (max-width: 480px){
    flex-direction: column;
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;

  > label {
    margin-bottom: 2rem;
    font-size: 1.2rem;
  }
`;

export const ProjectsCard = styled.div`
  color: white;
  background: rgba(255, 255, 255, 0.5);
  padding: 1rem;
  margin: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;

 > div {
  > span {
    font-size: 1.2rem;
  }

  > p {
    filter: opacity(0.5);
  }
 }

  transition: all 0.5s;

  &:hover {
    cursor: pointer;
    filter: brightness(0.9);
  }
`;