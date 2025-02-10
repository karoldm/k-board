import React, { ComponentPropsWithoutRef } from 'react';
import { InputStyled, InputStyledFile } from './style';

type Props =  ComponentPropsWithoutRef<'input'> & {
  setValue: (value: string) => void,
}

export const Input = ({ setValue, ...props}: Props) => {
    if(props.type && props.type=="file") {
      return (
        <InputStyledFile
          {...props}
          onChange={(e) => setValue(e.target.value)} 
        />
      )
    }
    return (
      <InputStyled
        {...props}
        onChange={(e) => setValue(e.target.value)}
      />
    );
}