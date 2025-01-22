import styled from 'styled-components';


export const ButtonContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  #icon {
    position: absolute;
    left: 0;
    fill: var(--red);
  }
`;

export const BorderBackground = styled.div`
  background: linear-gradient(36deg, red, pink, blue);
  flex: 1;
  padding: 1px;
  border-radius: 16px;
  display: flex;

  max-width: 450px;
`;

export const ContainerForm = styled.section`
  background: var(--white);
  max-width: 450px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 16px;

  font-size: 1rem;
  text-align: center;

  border: 1px solid var(--primary);

  span {
    text-align: justify;
    font-size: .9rem;
    font-weight: 500;
    line-height: 1.5rem;
  }
`;

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  padding: 16px;
  background-color: var(--background);
`;