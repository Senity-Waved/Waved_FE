/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios, { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
// import { serialize } from 'cookie';

export interface IAuth {
  hasInfo: boolean;
  accessToken: string;
  refreshToken: string;
}

export default async function Session(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const response: AxiosResponse = await axios.get(
        'https://waved.azurewebsites.net/oauth2/authorization/google',
      );
      // const { hasInfo, accessToken, refreshToken } = response.data;
      // console.log(response.headers.location);

      // console.log(response);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const redirectUri = response.request;
      console.log(redirectUri);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      res.status(200).json({ url: redirectUri });

      // res.setHeader('Set-Cookie', [
      //   serialize('accessToken', accessToken, {
      //     path: '/',
      //     maxAge: 60 * 60 * 24 * 7,
      //     httpOnly: false,
      //     secure: process.env.NODE_ENV === 'development',
      //   }),
      //   serialize('refreshToken', refreshToken, {
      //     path: '/',
      //     maxAge: 60 * 60 * 24 * 7,
      //     httpOnly: true,
      //     secure: process.env.NODE_ENV === 'development',
      //   }),
      // ]);

      // res.status(200).json({ hasInfo, message: 'Authentication successful' });
    } catch (error) {
      console.error('Error fetching tokens:', error);
      res.status(500).json({ message: 'Authentication failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
