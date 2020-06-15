import styled, { keyframes } from 'styled-components'
import { shade } from 'polished'
import backgroundImg from '../../assets/sign-in-background.png'

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  place-content: center;
  width: 100%;
  max-width: 700px;
`;

export const Background = styled.div`
  flex: 1;
  background: url(${backgroundImg}) no-repeat center;
  background-size: cover;
  border: none;
`;

const AppearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translate(-50px);
  }
  to {
    opacity: 1;
    transform: translate(0px);
  }
`

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${AppearFromLeft} .9s;

  form {
    margin: 60px 0 20px;
    width: 340px;
    text-align: center;
    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4EDE8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;
      &hover {
        color: ${shade(0.2, '#f4EDE8')};
      }
    }
  }
  > a {
    color: #FF9000;
    display: flex;
    align-items: center;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
    &hover {
      color: ${shade(0.2, '#FF9000')};
    }

    svg {
      margin-right: 10px;
    }
  }
`;
