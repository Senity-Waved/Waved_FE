import axios, { AxiosInstance } from 'axios';
import { onRequest, onResponse, onResponseError } from './interceptors';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(onRequest);
axiosInstance.interceptors.response.use(onResponse);
axiosInstance.interceptors.response.use(
  (response) => response,
  onResponseError,
);

export default axiosInstance;
