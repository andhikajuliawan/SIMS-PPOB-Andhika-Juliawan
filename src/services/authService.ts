import api from '../env/axiosInstance.ts';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../intefaces/auth.interface.ts';

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/login', credentials);
    return response.data;
  },

  register: async (
    credentials: RegisterRequest
  ): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>(
      '/registration',
      credentials
    );
    return response.data;
  },
};
