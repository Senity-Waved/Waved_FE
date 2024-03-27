import { AxiosError } from 'axios';
import { useEffect } from 'react';
import axiosInstance from '@/lib/axios/instance';
import useSnackBar from '@/hooks/useSnackBar';

export default function ClientErrorSnackBar() {
  const { openSnackBar } = useSnackBar();

  const handleError = (error: AxiosError) => {
    const { code } = error;
    const status = error.response?.status;

    if (code === 'ECONNABORTED' || status === 408) {
      openSnackBar('요청 시간이 초과되었습니다. 다시 시도 해주세요.');
    }

    if (code === 'ERR_NETWORK') {
      openSnackBar('네트워크 에러가 발생했습니다.');
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
