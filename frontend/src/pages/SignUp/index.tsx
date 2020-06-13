import React from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi'
import { Container, Content, Background } from './styles';
import { Input, Button } from '../../components'
import logoImg from '../../assets/logo.svg'

const SignUp: React.FC = () => {
  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt='goBarber' />
        <form>
          <h1>Faça seu cadastro</h1>
          <Input name='name' placeholder='Name' icon={FiUser} />
          <Input name='email' placeholder='Email' icon={FiMail} />
          <Input name='password' placeholder='Senha' type='password' icon={FiLock} />
          <Button type='submit'>Cadastrar</Button>
        </form>
        <a href='login'><FiArrowLeft />Voltar para Login</a>
      </Content>
    </Container>
  );
}

export default SignUp;
