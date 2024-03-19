import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  hasInfo: boolean;
  accessToken?: string;
  refreshToken?: string;
};

export default function LoginHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'GET') {
    const testAccessToken = 'testaccesstoken';
    const testRefreshToken = 'testrefreshtoken';

    res.status(200).json({
      hasInfo: true,
      accessToken: testAccessToken,
      refreshToken: testRefreshToken,
    });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
