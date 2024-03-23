import axios, { AxiosError } from 'axios';
import { getCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import { CustomAxiosRequestConfig } from './axiosConfig';

interface IReissueResponse {
  accessToken: string;
  message: string;
}

const createServerInstance = (context: GetServerSidePropsContext) => {
  const serverInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });

  serverInstance.interceptors.request.use((config) => {
    const accessToken = getCookie('accessToken', { req: context.req });
    if (accessToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  serverInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const customConfig = error.config as CustomAxiosRequestConfig;
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data === '만료된 JWT 토큰입니다.' &&
        error.config &&
        !customConfig.isRetryRequest
      ) {
        try {
          const refreshToken = getCookie('refreshToken', { req: context.req });
          if (!refreshToken) {
            throw new Error('재발급 요청을 위해 refreshToken 확인');
          }

          const { data: reissueData } = await axios.post<IReissueResponse>(
            'http://127.0.0.1:3000/api/auth/reissue',
            { refreshToken },
            {
              headers: { 'Content-Type': 'application/json' },
            },
          );

          console.log('새로 발급받은 액세스 토큰:', reissueData.accessToken);

          if (customConfig.headers) {
            customConfig.headers.Authorization = `Bearer ${reissueData.accessToken}`;
          }
          customConfig.isRetryRequest = true;

          return await serverInstance(customConfig);
        } catch (reissueError) {
          return Promise.reject(reissueError);
        }
      }
      return Promise.reject(error);
    },
  );

  return serverInstance;
};

export default createServerInstance;
