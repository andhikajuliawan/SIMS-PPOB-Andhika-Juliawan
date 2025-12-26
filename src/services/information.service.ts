import api from './axiosInstance.ts';
import type {
  BannerResponse,
  ServiceResponse,
} from '../intefaces/information.interface.ts';

export const informationService = {
  getBanners: async (): Promise<BannerResponse> => {
    const response = await api.get('/banner');
    return response.data;
  },
  getServices: async (): Promise<ServiceResponse> => {
    const response = await api.get('/services');
    return response.data;
  },
};
