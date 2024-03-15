import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export interface IAuth {
  hasInfo: boolean;
  accessToken: string;
  refreshToken: string;
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // 인증 API로부터 토큰 가져오기
      const response = await axios.get<IAuth>(
        'http://localhost:3000/api/login',
      );
      const { hasInfo, accessToken, refreshToken } = response.data;

      res.setHeader('Set-Cookie', [
        serialize('accessToken', accessToken, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'development',
        }),
        serialize('refreshToken', refreshToken, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'development',
        }),
      ]);

      res.status(200).json({ hasInfo, message: 'Authentication successful' });
    } catch (error) {
      // 에러 처리
      console.error('Error fetching tokens:', error);
      res.status(500).json({ message: 'Authentication failed' });
    }
  } else {
    // GET 요청이 아닌 경우 처리
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
