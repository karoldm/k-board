import styled from 'styled-components';

export const ContainerLeft = styled.section`
  background-image: url('/kanbanboard.png');
  background-size: 100%;
  background-repeat: no-repeat;
  
  
  &:after {
    z-index: -1;
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    background: var(--primary);
    filter: opacity(0.9);
  }

  flex: 5;
  min-height: 100vh;
`;

export const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  > div {
    flex: 1;
  }
`;

export const ContainerRight = styled.section`
  > img {
    width: 6rem;
    max-width: 100%;
  }

  background: var(--white);
  flex: 3;
  min-height: 100vh;

  padding: 1rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;

  font-size: 1.2rem;
  text-align: center;
`;

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;

  @media (max-width: 480px){
    flex-direction: column;
  }
`;