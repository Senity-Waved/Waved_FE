import type { NextApiRequest, NextApiResponse } from 'next';
import IMyProcessingChallenge from '@/types/myProcessingChallenge';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IMyProcessingChallenge[]>,
) {
  res.status(200).json([
    {
      groupId: 5,
      groupTitle: '프론트엔드 아티클 공유 챌린지 2기',
      startDate: '2024-03-14',
      thumbnail: 'https://via.placeholder.com/400x800.jpg',
    },
    {
      groupId: 8,
      groupTitle: '1일 1커밋 챌린지 2기',
      startDate: '2024-03-10',
      thumbnail: 'https://via.placeholder.com/600x400.jpg',
    },
    {
      groupId: 11,
      groupTitle: '스크린타임 4시간 챌린지 2기',
      startDate: '2024-03-08',
      thumbnail: 'https://via.placeholder.com/500x600.jpg',
    },
  ]);
}
