import type {
  BalanceResponse,
  UserRequest,
  UserResponse,
} from '../intefaces/user.interface.ts';
import api from './axiosInstance.ts';

export const userService = {
  getUser: async (): Promise<UserResponse> => {
    const response = await api.get('/profile');
    return response.data;
  },
  getUserBalance: async (): Promise<BalanceResponse> => {
    const response = await api.get('/balance');
    return response.data;
  },
  updateUser: async (payload: UserRequest): Promise<UserResponse> => {
    const response = await api.put('/profile/update', payload);
    return response.data;
  },
  updateProfileImage: async (payload: FormData): Promise<UserResponse> => {
    const response = await api.put('/profile/image', payload);
    return response.data;
  }
};
