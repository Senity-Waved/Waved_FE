import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import { IReissueResponse } from './serverInstance';

const onSilentRefresh = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const refreshToken = getCookie('refreshToken', { req, res });

    console.log('onSilent refresh: ', refreshToken);
    if (!refreshToken) {
      res.status(400).json({
        message:
          '만료 전 accessToken 재발급을 위한 refreshToken이 존재하지 않습니다.',
      });
      return;
    }

    const { data: reissueData } = await axios.post<IReissueResponse>(
      `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/auth/server/reissue`,
      { refreshToken },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    console.log('silentRefresh로 받은 data', reissueData);
    console.log('✨ 만료 전 액세스 토큰을 재발급받았습니다.');

    if (reissueData) {
      const newAccessToken = reissueData.accessToken;
      setCookie('accessToken', newAccessToken, {
        req,
        res,
        path: '/',
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24,
        sameSite: 'lax',
      });
    }
  } catch (error) {
    console.error('액세스 토큰 만료 전 자동 재발급 중 에러 발생:', error);

    res.status(500).json({
      message:
        '액세스 토큰 만료 전 자동 재발급 과정에서 서버 에러가 발생했습니다.',
    });
  }
};

export default onSilentRefresh;
