import type { ApiResponse } from './api.interface.ts';

export interface User {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
  isLoading: boolean;
}

export interface UserRequest {
  email: string;
  first_name: string;
  last_name: string;
}

export type UserResponse = ApiResponse<User>;

export type SetUserPayloadAction = Omit<User, 'isLoading'>;
