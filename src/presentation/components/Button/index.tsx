import React, { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

import { IconButton, PrimaryButton, SecondaryButton } from './style';

type Props = ComponentPropsWithoutRef<'button'> & {
  width?: string;
  variant?: 'primary' | 'secondary' | 'icon';
  noBorder?: boolean;
 }

export const Button = ({ children, width, noBorder=false, variant='primary', ...props }: PropsWithChildren<Props>) => {
    if(variant == "secondary") {
      return (
        <SecondaryButton noBorder={noBorder} width={width} {...props} >
          {children}
        </SecondaryButton>
      )
    }

    if(variant == 'icon'){
      return (
        <IconButton noBorder={true} width={width}  {...props}>
          {children}
        </IconButton>
      )
    }

    return (
      <PrimaryButton noBorder={noBorder} width={width}  {...props}>
        {children}
      </PrimaryButton>
    )
}