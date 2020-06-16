import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from "react-router-dom";
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import getValidationErrors from '../../utils/getValidationErrors'
import { Container, Content, Background, AnimationContainer } from './styles';
import { Input, Button } from '../../components';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import { useToast } from '../../hooks/Toast';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(async (data: FormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('Email obrigatório').email('Digite um email válido'),
        password: Yup.string().min(6, 'No mínimo 6 digitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('users', data);

      addToast({
        type: 'success',
        title: 'Cadastro realizado',
        description: 'Você já pode fazer seu login no GoBarber'
      });

      history.push('/');

    } catch (error) {
      if (error instanceof Yup.ValidationError)
        formRef.current?.setErrors(getValidationErrors(error));
      else {
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente'
        });
      }
    }
  }, [addToast, history]);

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt='goBarber' />
          <Form onSubmit={handleSubmit} ref={formRef}>
            <h1>Faça seu cadastro</h1>
            <Input name='name' placeholder='Name' icon={FiUser} />
            <Input name='email' placeholder='Email' icon={FiMail} />
            <Input name='password' placeholder='Senha' type='password' icon={FiLock} />
            <Button type='submit'>Cadastrar</Button>
          </Form>
          <Link to='/'><FiArrowLeft />Voltar para Login</Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
}

export default SignUp;
