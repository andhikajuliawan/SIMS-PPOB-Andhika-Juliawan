import type { ApiInterface } from './api.interface.ts';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginData {
    token: string;
}

export type LoginResponse = ApiInterface<LoginData>;

export interface RegisterRequest {
  email: string;
  first_name:string;
  last_name: string;
  password: string;
}

export type RegisterResponse = ApiInterface;

export interface Auth {
  token: string | null;
  isAuthenticated: boolean;
}
