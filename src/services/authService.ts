import api from './axiosInstance.ts';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../intefaces/auth.interface.ts';

export const authService = {
  login: async (payload: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/login', payload);
    return response.data;
  },

  register: async (
    payload: RegisterRequest
  ): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>(
      '/registration',
      payload
    );
    return response.data;
  },
};
