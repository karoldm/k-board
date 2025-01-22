import React, { PropsWithChildren } from 'react';

import { ButtonStyled } from './style';

type Props = {
  borderColor?: string;
  onclick: () => void;
  width?: string;
}

export const Button = ({ children, width, borderColor, onclick }: PropsWithChildren<Props>) => {
  return (
    <ButtonStyled width={width} onClick={onclick} borderColor={borderColor}>
      {children}
    </ButtonStyled>
  );
}