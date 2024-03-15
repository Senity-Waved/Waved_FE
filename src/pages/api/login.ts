import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  hasInfo: boolean;
  accessToken?: string;
  refreshToken?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'GET') {
    // 로그인 성공 시 보낼 테스트 토큰 값
    const testAccessToken = 'testaccesstoken';
    const testRefreshToken = 'testrefreshtoken';

    // 클라이언트에 성공 메시지와 토큰 전송
    res.status(200).json({
      hasInfo: true,
      accessToken: testAccessToken,
      refreshToken: testRefreshToken,
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
