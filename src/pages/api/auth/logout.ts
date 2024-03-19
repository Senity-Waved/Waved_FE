import { NextApiRequest, NextApiResponse } from 'next';
import { deleteCookie } from 'cookies-next';

export default function logout(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    deleteCookie('accessToken', { req, res, path: '/' });
    deleteCookie('refreshToken', { req, res, path: '/' });

    res.status(200).json({ message: '로그인 유저의 토큰 제거 성공' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
