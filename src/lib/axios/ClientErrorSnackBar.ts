import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axiosInstance from '@/lib/axios/instance';
import useSnackBar from '@/hooks/useSnackBar';

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

    if (status === 500) {
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
