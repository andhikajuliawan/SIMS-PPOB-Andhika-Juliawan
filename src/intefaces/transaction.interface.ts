import type { ApiResponse } from './api.interface.ts';

export interface TransactionRequest {
  service_code: string;
}

export interface TopUpForm {
  top_up_amount: string;
}

export interface TopUpRequest {
  top_up_amount: number;
}

export interface TopUpData {
  balance: number;
}

export type TopUpResponse = ApiResponse<TopUpData>;
