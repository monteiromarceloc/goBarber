import styled from 'styled-components'
import { shade } from 'polished'

export const ButtonContainer = styled.button`
  background: #FF9000;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  width: 100%;
  height: 56px;
  color: #312E38;
  font-weight: bold;
  margin-top: 8px;
  transition: background-color 0.2s;
  &:hover{
    background: ${shade(0.2, '#FF9000')};
  }
`;
