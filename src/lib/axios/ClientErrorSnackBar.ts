import axios, { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axiosInstance from '@/lib/axios/instance';
import useSnackBar from '@/hooks/useSnackBar';
import { logoutApi } from './profile/api';

export default function ClientErrorSnackBar() {
  const { openSnackBar } = useSnackBar();
  const router = useRouter();

  const handleError = (error: AxiosError) => {
    const { code } = error;
    const status = error.response?.status;
    const message = error.response?.data;

    if (code === 'ECONNABORTED' || status === 408) {
      openSnackBar('요청 시간이 초과되었습니다. 다시 시도 해주세요.');
    }

    if (code === 'ERR_NETWORK') {
      openSnackBar('네트워크 에러가 발생했습니다.');
    }

    if (message === '블랙리스트에 포함된 토큰입니다.') {
      openSnackBar('블랙리스트에 포함된 토큰입니다.');
    }

    if (message === '인증정보가 없습니다.') {
      openSnackBar('인증정보가 없습니다.');
    }

    if (
      message === '다른 위치에서 로그인하여 현재 세션이 로그아웃 되었습니다.'
    ) {
      logoutApi()
        .then(() => {
          axios
            .post(
              '/api/auth/logout',
              {},
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              },
            )
            .then(() => {
              router
                .push({
                  pathname: '/',
                  query: { logout: true },
                })
                .catch((err) => {
                  console.error('로그아웃 후 온보딩 리디렉션 실패:', err);
                });
            })
            .catch((err) => {
              console.error(
                '클라이언트 측에서 로그아웃 처리 중 오류 발생:',
                err,
              );
            });
        })
        .catch((err) => {
          console.error('백엔드 서버 로그아웃 처리 중 오류 발생:', err);
        });
    }

    if (
      status === 500 &&
      message !== '다른 위치에서 로그인하여 현재 세션이 로그아웃 되었습니다.'
    ) {
      router.push('/500').catch(() => {
        openSnackBar('페이지 이동을 실패했습니다.');
      });
    }
    return Promise.reject(error);
  };

  const errorInterceptor = axiosInstance.interceptors.response.use(
    (response) => response,
    handleError,
  );

  useEffect(() => {
    return () => {
      axiosInstance.interceptors.response.eject(errorInterceptor);
    };
  }, [errorInterceptor]);

  return null;
}
