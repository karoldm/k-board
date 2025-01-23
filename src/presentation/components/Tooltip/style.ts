import styled from "styled-components";

export const Container = styled.div`
  position: relative;
`;

export const StyledTooltip = styled.div<{ show: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  background: var(--primary);
  color: var(--white);
  font-size: 14px;
  padding: 8px;
  border-radius: 8px;
  text-align: center;
  width: auto;
  min-width: 80px;
  z-index: 99999;
  display: ${({ show }) => (show ? "block" : "none")};

  &::before {
    content: "";
    position: absolute;
    top: -15px;
    left: 4px;
    border-width: 8px;
    border-style: solid;
    border-color: transparent transparent var(--primary) transparent;
  }
`;