import { PropsWithChildren, useState } from "react";
import { Container, StyledTooltip } from "./style";

type Props = {
  text: string;
}

export const Tooltip = ({ text, children} : PropsWithChildren<Props>) => {
  const [show, setShow] = useState(false);

  return (
    <Container
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <StyledTooltip show={show}>
        {text}
      </StyledTooltip>
    </Container>
  );
}