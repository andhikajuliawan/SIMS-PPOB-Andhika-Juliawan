import api from './axiosInstance.ts';
import type {
  TopUpRequest,
  TopUpResponse,
  TransactionRequest,
  TransactionResponse,
} from '../intefaces/transaction.interface.ts';

export const transactionService = {
  topUp: async (payload: TopUpRequest): Promise<TopUpResponse> => {
    const response = await api.post('/topup', payload);
    return response.data;
  },

  transaction: async (payload: TransactionRequest): Promise<TransactionResponse> => {
    const response = await api.post('/transaction', payload);
    return response.data;
  },
};