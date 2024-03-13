import type { NextApiRequest, NextApiResponse } from 'next';
import IChallengeList from '@/types/recruitingChallenge';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IChallengeList[]>,
) {
  res.status(200).json([
    {
      challengeGroupId: 3,
      groupTitle: '백엔드 기술면접 챌린지 3기',
      thumbnail: 'https://via.placeholder.com/300x800.jpg',
      verificationType: 'TEXT',
      isFree: false,
      participantCount: 23,
      startDate: '2024-03-14',
    },
    {
      challengeGroupId: 6,
      groupTitle: '프론트엔드 아티클 공유 챌린지 3기',
      thumbnail: 'https://via.placeholder.com/400x800.jpg',
      verificationType: 'LINK',
      isFree: false,
      participantCount: 83,
      startDate: '2024-03-15',
    },
    {
      challengeGroupId: 9,
      groupTitle: '1일 1커밋 챌린지 3기',
      thumbnail: 'https://via.placeholder.com/500x500.jpg',
      verificationType: 'GITHUB',
      isFree: true,
      participantCount: 323,
      startDate: '2024-03-16',
    },
    {
      challengeGroupId: 12,
      groupTitle: '스크린타임 4시간 챌린지 3기',
      thumbnail: 'https://via.placeholder.com/600x1000.jpg',
      verificationType: 'PICTURE',
      isFree: true,
      participantCount: 27,
      startDate: '2024-03-25',
    },
  ]);
}
