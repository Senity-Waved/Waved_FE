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

const onErrorRequest = (err: AxiosError | Error): Promise<AxiosError> => {
  return Promise.reject(err);
};

const onResponseError = async (error: AxiosError) => {
  console.error(error);
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

      console.log(data.message);
      return await axios(error.config);
    } catch (reissueError) {
      console.error('액세스 토큰 재발급 실패', reissueError);
      return Promise.reject(reissueError);
    }
  }

  return Promise.reject(error);
};

export { onRequest, onErrorRequest, onResponse, onResponseError };
