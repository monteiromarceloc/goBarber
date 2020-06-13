import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  height: 20px;

  span {
    background: #c53030;
    color: #fff;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    width: 160px;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.4s;

    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    &::before {
      content: '';
      border-style: solid;
      border-color: #c53030 transparent;
      border-width: 6px 6px 0 6px;
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover {
    span {
      opacity: 1;
      visibility: visible;
    }
  }
`;
