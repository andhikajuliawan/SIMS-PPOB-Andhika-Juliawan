export interface ApiInterface<T = null> {
  status: number;
  message: string;
  data: T;
}