import { NextApiRequest, NextApiResponse } from 'next';

interface IRefreshToken {
  refreshToken: string;
}
interface IReissueResponse {
  accessToken: string;
}

export default function ReissueHandler(
  req: NextApiRequest,
  res: NextApiResponse<IReissueResponse>,
) {
  if (req.method === 'POST') {
    const { refreshToken } = req.body as IRefreshToken;

    if (refreshToken && refreshToken === 'testrefreshtoken') {
      const newAccessToken = 'newAccesstoken';

      res.status(200).json({
        accessToken: newAccessToken,
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
