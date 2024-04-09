import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'cookies-next';
import IAuth from '@/types/auth';

export default function Session(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { accessToken, refreshToken } = req.body as IAuth;

      if (accessToken && refreshToken) {
        setCookie('accessToken', accessToken, {
          req,
          res,
          path: '/',
          maxAge: 60 * 60 * 24,
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'none',
        });

        setCookie('refreshToken', refreshToken, {
          req,
          res,
          path: '/',
          maxAge: 60 * 60 * 24,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'none',
        });

        res.status(200).json({ message: '토큰 저장 성공' });
      } else {
        res
          .status(400)
          .json({ message: '토큰 저장 실패 | 토큰이 존재하지 않습니다.' });
      }
    } catch (error) {
      res.status(500).json({ message: '토큰 저장에 실패하였습니다.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
