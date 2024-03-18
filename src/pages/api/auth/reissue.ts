import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import IAuth from '@/types/auth';

export default async function Reissue(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const refreshToken = getCookie('refreshToken', { req, res });

      if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided' });
      }

      const response = await axios.post<IAuth>(
        'http://localhost:3000/api/test/reissue',
        {
          refreshToken,
        },
      );

      const { accessToken } = response.data;

      setCookie('accessToken', accessToken, {
        req,
        res,
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        httpOnly: false,
        secure: process.env.NODE_ENV === 'development',
      });

      res.status(200).json({ message: 'Token refreshed successfully' });
    } catch (error) {
      console.error('Error refreshing tokens:', error);
      res.status(500).json({ message: 'Failed to refresh token' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
