import React from 'react';

import { ButtonStyled } from './style';

type Props = {
  children: JSX.Element,
  color?: string,
  onclick: () => void,
}

export const Button = ({ children, color, onclick }: Props) => {
  return (
    <ButtonStyled onClick={onclick} color={color}>
      {children}
    </ButtonStyled>
  );
}