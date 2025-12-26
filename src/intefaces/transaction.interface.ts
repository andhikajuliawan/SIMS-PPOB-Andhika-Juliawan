import type { ApiResponse } from './api.interface.ts';

export interface TransactionRequest {
  service_code: string;
}

export interface TransactionData {
  invoice_number: string;
  service_code: string;
  service_name: string;
  transaction_type: string;
  total_amount: number;
  created_on: string;
}

export type TransactionResponse = ApiResponse<TransactionData>;

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
