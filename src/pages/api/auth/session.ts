import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import IAuth from '@/types/auth';

export default function Session(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      console.log(req.body);
      const { accessToken, refreshToken } = req.body as IAuth;

      res.setHeader('Set-Cookie', [
        serialize('accessToken', accessToken, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: false,
          secure: false,
          sameSite: 'strict',
        }),
        serialize('refreshToken', refreshToken, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true,
          secure: false,
          sameSite: 'strict',
        }),
      ]);

      res.status(200).json({ message: '서버에 토큰 전달 성공' });
    } catch (error) {
      console.error('토큰관리에 실패하였습니다.', error);
      res.status(500).json({ message: '서버에 토큰 전달 실패' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
