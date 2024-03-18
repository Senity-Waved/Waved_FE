import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { getCookie } from 'cookies-next';

interface IAuthResponse {
  message: string;
  accessToken: string;
}

const onRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const { method, url } = config;
  console.log(`🛫 [API - REQUEST] ${method?.toUpperCase()} ${url}`);

  const accessToken = getCookie('accessToken');

  if (accessToken) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

const onResponse = (res: AxiosResponse): AxiosResponse => {
  const { method, url } = res.config;
  console.log(
    `🛫 [API - RESPONSE] ${method?.toUpperCase()} ${url} | ${res.data}`,
  );
  return res;
};

const onResponseError = async (error: AxiosError) => {
  if (
    error.response &&
    error.response.status === 401 &&
    error.response.data === '만료된 JWT 토큰입니다.'
  ) {
    try {
      await axios.post<IAuthResponse>('/api/auth/reissue');
      return await Promise.reject(error);
    } catch (reissueError) {
      console.error('액세스 토큰 재발급 실패', reissueError);
      return Promise.reject(reissueError);
    }
  }

  return Promise.reject(error);
};

export { onRequest, onResponse, onResponseError };
