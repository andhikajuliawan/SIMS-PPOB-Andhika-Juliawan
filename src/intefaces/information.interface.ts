import type { ApiResponse } from './api.interface.ts';

export interface ServiceData {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

export type ServiceResponse = ApiResponse<ServiceData[]>;

export interface BannerData {
  banner_name: string;
  banner_image: string;
  description: string;
}

export type BannerResponse = ApiResponse<BannerData[]>;
