import React, { PropsWithChildren } from 'react';

import { IconButton, PrimaryButton, SecondaryButton } from './style';

type Props = {
  onclick: () => void;
  width?: string;
  variant?: 'primary' | 'secondary' | 'icon';
  id?: string;
  noBorder?: boolean;
 }

export const Button = ({ children, width, noBorder=false, onclick, variant='primary', id }: PropsWithChildren<Props>) => {
    if(variant == "secondary") {
      return (
        <SecondaryButton noBorder={noBorder} id={id} width={width} onClick={onclick}>
          {children}
        </SecondaryButton>
      )
    }

    if(variant == 'icon'){
      return (
        <IconButton noBorder={true} id={id} width={width} onClick={onclick}>
          {children}
        </IconButton>
      )
    }

    return (
      <PrimaryButton noBorder={noBorder} id={id} width={width} onClick={onclick}>
        {children}
      </PrimaryButton>
    )
}