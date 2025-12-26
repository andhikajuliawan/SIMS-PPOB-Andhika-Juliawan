import api from './axiosInstance.ts';
import type {
  TopUpRequest,
  TopUpResponse,
} from '../intefaces/transaction.interface.ts';

export const transactionService = {
  topUp: async (payload: TopUpRequest): Promise<TopUpResponse> => {
    const response = await api.post('/topup', payload);
    return response.data;
  },
};