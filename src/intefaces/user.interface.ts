import type { ApiResponse } from './api.interface.ts';

export interface User {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
  balance: number;
  isLoadingUser: boolean;
  isLoadingBalance: boolean;
}

export interface UserData {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}

export interface UserRequest {
  email: string;
  first_name: string;
  last_name: string;
}

export type UserResponse = ApiResponse<UserData>;

interface BalanceData {
  balance: number;
}

export type BalanceResponse = ApiResponse<BalanceData>;
