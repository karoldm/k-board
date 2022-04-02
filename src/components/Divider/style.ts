import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 2rem 0;

  font-size: 1.2rem;
  font-weight: 500;
  color: ${(props) => props.color || "var(--black)"};

  text-align: center;

  > p {
    width: 45%;
  }

  > div {
    background: ${(props) => props.color || "var(--black)"};
    height: 1px;
    width: 100%;
  }
`;