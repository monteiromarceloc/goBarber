import React, { useCallback, useRef } from 'react';
import { Link } from "react-router-dom";
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import getValidationErrors from '../../utils/getValidationErrors'
import { Container, Content, Background, AnimationContainer } from './styles';
import { Input, Button } from '../../components'
import logoImg from '../../assets/logo.svg'

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
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

    } catch (error) {
      formRef.current?.setErrors(getValidationErrors(error));
    }
  }, []);

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
