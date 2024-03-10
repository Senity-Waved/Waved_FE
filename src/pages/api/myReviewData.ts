import type { NextApiRequest, NextApiResponse } from 'next';
import IMyReview from '@/types/myReview';

export default function myReviewData(
  req: NextApiRequest,
  res: NextApiResponse<IMyReview[]>,
) {
  res.status(200).json([
    {
      id: '2634637',
      challengeTitle: '프론트엔드 기술 면접 1기',
      createdDate: '2024년 03월 10일',
      context:
        '피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요.',
    },
    {
      id: '43436',
      challengeTitle: '1일 1커밋',
      createdDate: '2024년 02월 22일',
      context:
        '피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요.피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요.피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요.피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요.',
    },
    {
      id: '163636',
      challengeTitle: '1일 1커밋',
      createdDate: '2024년 02월 22일',
      context:
        '피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요.피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요.피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요.피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요.',
    },
    {
      id: '264532',
      challengeTitle: '1일 1커밋',
      createdDate: '2024년 02월 22일',
      context:
        '피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요.피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요.피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요.피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요.',
    },
  ]);
}
