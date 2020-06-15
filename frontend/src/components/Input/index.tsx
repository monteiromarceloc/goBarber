import React, { InputHTMLAttributes, useEffect, useState, useRef, useCallback } from 'react';
import { IconBaseProps } from 'react-icons'
import { useField } from '@unform/core'

import { InputContainer, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setisFocused] = useState(false)
  const [isFilled, setisFilled] = useState(false)
  const { fieldName, defaultValue, error, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value"
    })
  }, [fieldName, registerField])

  const handleInputBlur = useCallback(() => {
    setisFocused(false);
    if (inputRef.current?.value) setisFilled(true);
  }, []);

  return (
    <InputContainer isFocused={isFocused} isFilled={isFilled} hasError={!!error}>
      {Icon && <Icon size={20} />}
      <input
        defaultValue={defaultValue}
        ref={inputRef}
        onFocus={() => setisFocused(true)}
        onBlur={handleInputBlur}
        {...rest}
      />
      {error && <Error title={error} />
      }
    </InputContainer>
  )
}

export default Input;
