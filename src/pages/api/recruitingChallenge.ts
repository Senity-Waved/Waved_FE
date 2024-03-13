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
      startDate: '2024-03-25',
    },
    {
      challengeGroupId: 3,
      groupTitle: '프론트엔드 아티클 공유 챌린지 3기',
      thumbnail: 'https://via.placeholder.com/300x800.jpg',
      verificationType: 'LINK',
      isFree: false,
      participantCount: 83,
      startDate: '2024-03-25',
    },
    {
      challengeGroupId: 3,
      groupTitle: '1일 1커밋 챌린지 3기',
      thumbnail: 'https://via.placeholder.com/300x800.jpg',
      verificationType: 'GITHUB',
      isFree: false,
      participantCount: 323,
      startDate: '2024-03-25',
    },
    {
      challengeGroupId: 3,
      groupTitle: '백엔드 기술면접 챌린지 3기',
      thumbnail: 'https://via.placeholder.com/300x800.jpg',
      verificationType: 'PICTURE',
      isFree: false,
      participantCount: 27,
      startDate: '2024-03-25',
    },
  ]);
}
