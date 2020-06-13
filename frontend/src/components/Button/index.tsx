import React, { ButtonHTMLAttributes } from 'react';
import { ButtonContainer } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = (props) => (
  <ButtonContainer type='button' {...props}></ButtonContainer>
)

export default Button;
