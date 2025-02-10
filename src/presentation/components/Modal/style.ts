import styled from 'styled-components';

export const Wrapper = styled.div`
  z-index: 1000;
  position: absolute;
  top: 0; bottom: 0; left: 0; right: 0;
`;

export const Background = styled.div`
  width: 100%;
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
  background: rgba(0, 0, 0, 0.5);
  
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalStyled = styled.div`
  position: absolute;
  left: 30%; top: 25%;
  z-index: 10000;
  background: var(--white);
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem 2rem 2rem;
  border-radius: 8px;
  width: 35%;

  .exit-button {
    background: transparent;
    display: flex;
    justify-content: end;
    margin-bottom: 1rem;
  }

  .exit-button:hover{
    cursor: pointer;
  }

  @media (max-width: 480px){
    width: 80%;
    left: 10%;
  }
`;