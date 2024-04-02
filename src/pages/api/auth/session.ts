import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'cookies-next';
import IAuth from '@/types/auth';
import onSilentRefresh from '@/lib/axios/onSilentRefresh';

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
          sameSite: 'lax',
        });

        setCookie('refreshToken', refreshToken, {
          req,
          res,
          path: '/',
          maxAge: 60 * 60 * 24,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        });

        setTimeout(
          () => {
            onSilentRefresh(req, res).catch(console.error);
          },
          1 * 60 * 1000,
        );

        res.status(200).json({ message: '서버에 토큰 전달 성공' });
      } else {
        res.status(400).json({ message: 'Missing token' });
      }
    } catch (error) {
      console.error('토큰관리에 실패하였습니다.', error);
      res.status(500).json({ message: '서버에 토큰 전달 실패' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
