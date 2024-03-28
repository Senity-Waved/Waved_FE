import { AxiosError } from 'axios';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  PreviewData,
} from 'next';
import { ParsedUrlQuery } from 'querystring';

export default function serverErrorCatch(
  getServerSidePropsFunction: GetServerSideProps,
) {
  return async (
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  ) => {
    try {
      return await getServerSidePropsFunction(context);
    } catch (error) {
      const axiosError = error as AxiosError;
      const { code } = axiosError;
      const status = axiosError.response?.status;
      const message = axiosError.response?.data;

      if (code === 'ECONNABORTED' || status === 408) {
        return {
          props: {
            requireSnackBar: true, // snackbar 띄워줄지 여부
            errorMsg: '요청시간이 초과되었습니다. 다시 시도 해주세요.', // snackbar 메시지 내용
          },
        };
      }
      if (code === 'ERR_NETWORK') {
        return {
          props: {
            requireSnackBar: true, // snackbar 띄워줄지 여부
            errorMsg: '네트워크 에러가 발생했습니다.', // snackbar 메시지 내용
          },
        };
      }

      if (message === '블랙리스트에 포함된 토큰입니다.') {
        return {
          props: {
            requireSnackBar: true,
            errorMsg: '블랙리스트에 포함된 토큰입니다.',
          },
        };
      }

      if (message === '인증정보가 없습니다.') {
        return {
          props: {
            requireSnackBar: false,
            errorMsg: '인증정보가 없습니다.',
          },
        };
      }

      if (status === 500) {
        return {
          props: {
            requireSnackBar: false,
            errorMsg: '500',
          },
        };
      }
      return {
        props: {
          requireSnackBar: true,
          errorMsg: axiosError.message || '에러가 발생했습니다.',
        },
      };
    }
  };
}
