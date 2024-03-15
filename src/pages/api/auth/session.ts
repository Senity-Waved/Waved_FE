import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export interface IAuth {
  hasInfo: boolean;
  accessToken: string;
  refreshToken: string;
}

export default async function Session(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    try {
      const response = await axios.get<IAuth>(
        'http://localhost:3000/api/test/login',
      );
      const { hasInfo, accessToken, refreshToken } = response.data;

      res.setHeader('Set-Cookie', [
        serialize('accessToken', accessToken, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: false,
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
      console.error('Error fetching tokens:', error);
      res.status(500).json({ message: 'Authentication failed' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
