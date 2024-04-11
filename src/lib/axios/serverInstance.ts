import axios, { AxiosError } from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import { CustomAxiosRequestConfig } from './axiosConfig';

interface IReissueResponse {
  accessToken: string;
  message: string;
}

const createServerInstance = (context: GetServerSidePropsContext) => {
  const serverInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
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
            deleteCookie('accessToken', {
              req: context.req,
              res: context.res,
              path: '/',
            });
            throw new Error('인증 정보가 만료되어 로그아웃 되었습니다.');
          }

          const { data: reissueData } = await axios.post<IReissueResponse>(
            `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/auth/server/reissue`,
            { refreshToken },
            {
              headers: { 'Content-Type': 'application/json' },
            },
          );

          console.log('✨ 액세스 토큰을 재발급받았습니다.');

          setCookie('accessToken', reissueData.accessToken, {
            req: context.req,
            res: context.res,
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24,
            sameSite: 'lax',
          });

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
