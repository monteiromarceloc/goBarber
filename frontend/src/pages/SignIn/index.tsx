import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import { useAuth } from '../../hooks/AuthContext'
import getValidationErrors from '../../utils/getValidationErrors'
import { Container, Content, Background } from './styles';
import { Input, Button } from '../../components'
import logoImg from '../../assets/logo.svg';

interface signInCredentials {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();

  const handleSubmit = useCallback(async (data: signInCredentials) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().required('Email obrigatório').email('Digite um email válido'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      signIn({
        email: data.email,
        password: data.password,
      });

    } catch (error) {
      formRef.current?.setErrors(getValidationErrors(error));
    }
  }, [signIn]);

  return (
    <Container>
      <Content>
        <img src={logoImg} alt='goBarber' />
        <Form onSubmit={handleSubmit} ref={formRef}>
          <h1>Faça seu login</h1>
          <Input name='email' placeholder='Email' icon={FiMail} />
          <Input name='password' placeholder='Senha' type='password' icon={FiLock} />
          <Button type='submit'>Entrar</Button>
          <a href='forgot'>Equeci minha senha</a>
        </Form>
        <a href='signup'><FiLogIn />Criar conta</a>
      </Content>
      <Background />
    </Container>
  );
}

export default SignIn;
