export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  data: {
    token: string;
  };
}

export interface Auth {
  token: string | null;
  isAuthenticated: boolean;
}
