import styled, { css } from 'styled-components';
import { animated } from 'react-spring'

export interface ToastProps {
  type?: 'success' | 'error' | 'info';
  hasDescription?: boolean;
}

const toastVariations = {
  success: css`
    background: rgba(200,255,220, 0.4);
    color: #2e656a;
  `,
  info: css`
    background: rgba(220,230,255, 0.4);
    color: #3172b7;
  `,
  error: css`
    background: rgba(230,200,200, 0.6);
    color: #c53030;
  `
}

export const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 30px;
  overflow: hidden;
`;

export const ToastContainer = styled(animated.div) <ToastProps>`
  width: 360px;
  position: relative;
  padding: 16px 30px 13px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0,0,0, 0.2);

  display: flex;
  background: rgba(230,240,255, 0.4);
  color: #3172b7;

  & + div {
    margin-top: 12px;
  }

  ${({ type }) => toastVariations[type || 'info']}

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;
    p {
      margin-top: 4px;
      font-weight: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 12px;
    top: 15px;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${({ hasDescription }) => !hasDescription && css`
    align-items: center;
    svg {
      margin-top: 0;
    }
  `}

`;
