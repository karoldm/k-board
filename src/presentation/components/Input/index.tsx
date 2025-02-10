import React, { ComponentPropsWithoutRef, forwardRef } from 'react';
import { InputStyled, InputStyledFile, StyledColumn } from './style';

type Props =  ComponentPropsWithoutRef<'input'> & {
  setValue?: (value: string) => void;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ setValue, error, ...props }, ref) => {
  if(props.type && props.type=="file") {
      return (
        <StyledColumn gap="8px" fullWidth>
          <InputStyledFile
            ref={ref}
            {...props}
            onChange={(e) => setValue ? setValue(e.target.value) : ()=>{}} 
          />
          {error && <span className='error-message'>{error}</span>}
        </StyledColumn>
      )
    }
    return (
      <StyledColumn gap="8px" fullWidth>
          <InputStyled
            ref={ref}
            {...props}
            onChange={(e) => setValue ? setValue(e.target.value) : ()=>{}} 
          />
          {error && <span className='error-message'>{error}</span>}
        </StyledColumn>
    );
  }
)