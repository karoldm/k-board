import React, { PropsWithChildren } from 'react';

import { ButtonStyled } from './style';

type Props = {
  onclick: () => void;
  width?: string;
  variant?: 'primary' | 'secondary';
  id?: string;
  noBorder?: boolean;
 }

export const Button = ({ children, width, noBorder=false, onclick, variant='primary', id }: PropsWithChildren<Props>) => {
  return (
    <ButtonStyled noBorder={noBorder} id={id} variant={variant} width={width} onClick={onclick} >
      {children}
    </ButtonStyled>
  );
}