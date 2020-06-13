import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Container, Content, Background } from './styles';
import { Input, Button } from '../../components'
import logoImg from '../../assets/logo.svg'

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt='goBarber' />
        <form>
          <h1>Faça seu login</h1>
          <Input name='email' placeholder='Email' icon={FiMail} />
          <Input name='password' placeholder='Senha' type='password' icon={FiLock} />
          <Button type='submit'>Entrar</Button>
          <a href='forgot'>Equeci minha senha</a>
        </form>
        <a href='signup'><FiLogIn />Criar conta</a>
      </Content>
      <Background />
    </Container>
  );
}

export default SignIn;
