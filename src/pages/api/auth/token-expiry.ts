import { NextApiRequest, NextApiResponse } from 'next';

interface IDecodedToken {
  exp: number;
}
export default function tokenExpiry(req: NextApiRequest, res: NextApiResponse) {
  const cookieToken = req.cookies.accessToken;

  if (!cookieToken) {
    return res.status(401).json({ message: 'No accessToken found' });
  }

  const decoded: IDecodedToken = parseJwt(cookieToken);
  const expiresTime = decoded.exp * 1000;

  return res.status(200).json({ expiresTime });
}

function parseJwt(token: string): IDecodedToken {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = Buffer.from(base64, 'base64').toString();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return JSON.parse(jsonPayload);
}
