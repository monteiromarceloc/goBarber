import styled from 'styled-components'
import { shade } from 'polished'
import backgroundImg from '../../assets/sign-in-background.png'

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;
  width: 100%;
  max-width: 700px;

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

export const Background = styled.img`
  flex: 1;
  background: url(${backgroundImg}) no-repeat center;
  background-size: cover;
`;
