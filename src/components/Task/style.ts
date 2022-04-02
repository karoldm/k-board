import styled from 'styled-components';

export const Wrapper = styled.div`
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

  >p{
    width: 100%;
  }

  >button{
    background: transparent;
    border: none;
    color: var(--white);
    margin-left: auto;
  }

  >button:hover{
    cursor: pointer;
  }
`;