import api from '../env/axiosInstance.ts';
import type {
  LoginRequest,
  LoginResponse,
} from '../intefaces/authInterface.ts';

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/login', credentials);
    return response.data;
  },

};
