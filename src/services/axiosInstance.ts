import axios, { type AxiosError } from 'axios';
import { logout } from '../features/auth/authSlice.ts';
import { enqueueSnackbar } from 'notistack';
import { store } from '../features/store.ts';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<{ message: string }>) => {
    if (error.response && error?.response?.status === 401) {
      store.dispatch(logout());
      enqueueSnackbar(error.response?.data.message, { variant: 'error' });
    }
    return Promise.reject(error);
  }
);

export default api;
