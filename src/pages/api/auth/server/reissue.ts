import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function Reissue(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      // eslint-disable-next-line
      const body = req.body;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { refreshToken } = body;

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

        res.status(200).json({
          message: '🎇 액세스 토큰 재발급 성공',
          accessToken,
        });
      } else {
        res.status(401).json({ message: '액세스 토큰 재발급 실패' });
      }
    } catch (error) {
      console.error('Error refreshing tokens:', error);
      res.status(500).json({ message: 'Failed to refresh token' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}