import React, { useCallback, useRef } from 'react';
import {
  Image, View, KeyboardAvoidingView, Platform, ScrollView, TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Icon from 'react-native-vector-icons/Feather';

import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container, Title, ForgotPasswordText, ForgotPassword, CreateAccountButton, CreateAccountText,
} from './styles';

const SignIn: React.FC = () => {
  const nav = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSubmit = useCallback((data: any) => {
    console.log('data: ', data);
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logoImg} />
            <View><Title>Faça seu Login</Title></View>
            <Form onSubmit={handleSubmit} ref={formRef} style={{ width: '100%' }}>
              <Input
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <Input
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
                ref={passwordInputRef}
              />
              <Button onPress={() => formRef.current?.submitForm()}>Entrar</Button>
            </Form>
            <ForgotPassword>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => nav.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountText>Criar uma conta</CreateAccountText>
      </CreateAccountButton>
    </>
  );
};

export default SignIn;
