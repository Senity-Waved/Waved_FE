import axios, {
  AxiosInstance,
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { getCookie } from 'cookies-next';

export interface IAuthResponse {
  message: string;
  accessToken: string;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

const onRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const { method, url } = config;
  if (process.env.NODE_ENV !== 'production') {
    console.log(`🛫 [API - REQUEST] ${method?.toUpperCase()} ${url}`);
  }

  const accessToken = getCookie('accessToken');

  if (accessToken) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

const onResponse = (res: AxiosResponse): AxiosResponse => {
  const { method, url } = res.config;
  if (process.env.NODE_ENV !== 'production') {
    console.log(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      `🛫 [API - RESPONSE] ${method?.toUpperCase()} ${url} | ${res.data.message ? res.data.message : res.data}`,
    );
  }
  return res;
};

const onRequestError = (err: AxiosError | Error): Promise<AxiosError> => {
  return Promise.reject(err);
};

const onResponseError = async (error: AxiosError) => {
  if (
    error.response &&
    error.response.status === 401 &&
    error.response.data === '만료된 JWT 토큰입니다.' &&
    error.config
  ) {
    try {
      const { data } = await axios.post<IAuthResponse>(
        '/api/auth/reissue',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      // eslint-disable-next-line no-param-reassign
      error.config.headers.Authorization = `Bearer ${data.accessToken}`;

      return await axiosInstance(error.config);
    } catch (reissueError) {
      console.error('액세스 토큰 재발급 실패', reissueError);
      return Promise.reject(reissueError);
    }
  }

  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(onRequest, onRequestError);
axiosInstance.interceptors.response.use(onResponse);
axiosInstance.interceptors.response.use(
  (response) => response,
  onResponseError,
);

export default axiosInstance;
