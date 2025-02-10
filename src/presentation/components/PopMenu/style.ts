
import styled from "styled-components";

export const Wrapper = styled.div``;

export const ChildrenContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
`;

export const ItemsContainer = styled.div`
  background: var(--white);
  border-radius: 4px;
  padding: 8px;
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  display: flex;
  flex-direction: column;

  border: 1px solid var(--primary);
`;

export const StyledMenuItem = styled.button`
  background: transparent;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: var(--background);
  }

  &:active {
    background: var(--primary);
  }

  >p {
    font-size: .9rem;
    font-weight: 500;
    text-align: start;
    color: var(--black);
  }
`;