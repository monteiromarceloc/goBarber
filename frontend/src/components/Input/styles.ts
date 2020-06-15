import styled from 'styled-components'
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean,
  isFilled: boolean,
  hasError: boolean
}

export const InputContainer = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #232129;
  color: ${({ isFocused, isFilled }) => isFocused || isFilled ? '#FF9000' : '#666360'};
  border: 2px solid ${({ isFocused, hasError }) => isFocused ? '#FF9000' : hasError ? '#C53030' : '#232129'};
  border-radius: 8px;
  width: 100%;
  padding: 16px;
  margin-bottom: 12px;

  input {
    flex: 1%;
    background: transparent;
    border: 0;
    color: #F4EDE8;
    &::placeholder{
      color: #666360;
    }
    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 30px #232129 inset;
      -webkit-text-fill-color: #F4EDE8 !important;
    }
  }
  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  margin-left: 16px;
  svg {
    margin: 0;
  }
`;
