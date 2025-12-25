import type { UserRequest, UserResponse } from '../intefaces/user.interface.ts';
import api from './axiosInstance.ts';

export const userService = {
  getUser: async (): Promise<UserResponse> => {
    const response = await api.get('/profile');
    return response.data;
  },
  putUser: async (payload: UserRequest): Promise<UserResponse> => {
    const response = await api.put('/profile/update', payload);
    return response.data;
  }
};
