import axios, { AxiosResponse } from 'axios';
import { useAuth } from './Auth';
import { SignupOutput } from './endpointsOutput';

export interface AuthResult {
  login: (email: string, password: string)=> Promise<AxiosResponse<LoginOutput, any>>;
  signup: (nome: string, email: string, password: string, identificador: string, address: string, cep: string, state: string, city: string, phone: string) => Promise<AxiosResponse<SignupOutput, any>>;
}

export function useApi(): AuthResult {
  const { tokens } = useAuth();

  const client = axios.create({
    headers: { Authorization: `Bearer ${tokens?.authToken.token}` },
    baseURL: import.meta.env.VITE_API_URL,
  });

  async function login(email: string, password: string): Promise<AxiosResponse<LoginOutput, any>> {
    return client.post<LoginOutput>('/locador/login', {
      email,
      password,
    });
  }

  async function signup(nome: string, email: string, password: string, identificador: string, address: string, cep: string, state: string, city: string, phone: string): Promise<AxiosResponse<SignupOutput, any>> {
    return client.post<SignupOutput>('/locador/signup', {
      nome,
      email,
      password,
      identificador,
      address,
      cep,
      state,
      city,
      phone,
    });
  }

  return { login, signup };
}
