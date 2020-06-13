import styled from 'styled-components'

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #232129;
  color: #666360;
  border: 2px solid #232129;
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
  }
  svg {
    margin-right: 16px;
  }
`;
