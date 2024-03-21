import axios, { AxiosInstance } from 'axios';
import {
  onErrorRequest,
  onRequest,
  onResponse,
  onResponseError,
} from './interceptors';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:9000/api/v1',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(onRequest, onErrorRequest);
axiosInstance.interceptors.response.use(onResponse);
axiosInstance.interceptors.response.use(
  (response) => response,
  onResponseError,
);

export default axiosInstance;
