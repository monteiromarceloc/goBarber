import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  name: string;
}

interface signInCredentials {
  email: string;
  password: string;
}

interface IAuthContext {
  name: string;
  signIn(credentials: signInCredentials): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const name = localStorage.getItem('@GoBarber:name');
    if (token && name) return { token, name }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });
    const { token, name } = response.data;
    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:name', name);
    setData({ token, name });
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:name');
    setData({} as AuthState);
  }, [])

  return (
    <AuthContext.Provider value={{ name: data.name, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be use within an AuthProvider');
  }
  return context;
}
