import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';
import { getCookie, setCookie } from 'cookies-next';

export default async function Reissue(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const refreshToken = getCookie('refreshToken', { req, res });

      if (!refreshToken) {
        return res
          .status(401)
          .json({ message: '🚨 refresh Token이 존재하지 않습니다.' });
      }

      const response = await axios.post<string>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/members/reissue`,
        {},
        {
          headers: { Authorization: `Bearer ${refreshToken}` },
        },
      );

      if (response.data) {
        const accessToken = response.data;

        setCookie('accessToken', accessToken, {
          req,
          res,
          path: '/',
          maxAge: 60 * 60 * 24,
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'none',
        });

        res.status(200).json({
          message: '액세스 토큰 재발급 성공',
          accessToken,
        });
      } else {
        res.status(401).json({ message: '액세스 토큰 재발급 실패' });
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      const axiosErrorData = axiosError.response?.data;
      console.error('Error refreshing tokens:', axiosError);
      if (
        axiosErrorData ===
        '다른 위치에서 로그인하여 현재 세션이 로그아웃되었습니다.'
      ) {
        res
          .status(401)
          .json('다른 위치에서 로그인하여 현재 세션이 로그아웃되었습니다.');
      } else {
        res.status(500).json({ message: 'Failed to refresh token' });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
