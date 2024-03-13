import type { NextApiRequest, NextApiResponse } from 'next';

export interface IChallenge {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  challengeType: 'frontend' | 'backend' | 'life' | 'study';
  participantCount: number;
  startDate: string;
  endDate: string;
  isFree: boolean;
  verificationType: 'write' | 'photo' | 'link' | 'github';
  verificationMethod: string;
  verificationExample: string[];
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IChallenge[]>,
) {
  res.status(200).json([
    {
      id: 1,
      title: '기술 면접 챌린지 1기',
      thumbnail: 'https://via.placeholder.com/600x400.jpg',
      description:
        '자기 개발은 목표를 설정하고 달성하기 위한 여정입니다. 이 블로그 포스트에서는 일상 생활에 쉽게 통합할 수 있는 5가지 핵심 습관을 소개합니다. 첫 번째는 목표 설정과 시간 관리입니다. 이는 개인적 성취와 전문적 성장을 위한 기초를 마련합니다.\n두 번째 습관은 긍정적 사고를 통한 자기 격려입니다. 이는 도전을 극복하고 성공으로 나아가는 데 중요합니다. 세 번째는 건강 유지를 위한 일상적인 운동과 균형 잡힌 식단입니다. 건강한 몸은 능률적인 마음의 기초입니다. 네 번째는 지속적인 학습과 자기 계발입니다. ',
      challengeType: 'study',
      participantCount: 23,
      startDate: '03월 04일 (월)',
      endDate: '03월 15일 (금)',
      isFree: true,
      verificationType: 'photo',
      verificationMethod:
        '자기 개발은 목표를 설정하고 달성하기 위한 여정입니다. 이 블로그 포스트에서는 일상 생활에 쉽게 통합할 수 있는 5가지 핵심 습관을 소개합니다. 첫 번째는 목표 설정과 시간 관리입니다. 이는 개인적 성취와 전문적 성장을 위한 기초를 마련합니다.\n두 번째 습관은 긍정적 사고를 통한 자기 격려입니다. 이는 도전을 극복하고 성공으로 나아가는 데 중요합니다. 세 번째는 건강 유지를 위한 일상적인 운동과 균형 잡힌 식단입니다. 건강한 몸은 능률적인 마음의 기초입니다. 네 번째는 지속적인 학습과 자기 계발입니다. ',
      verificationExample: [
        'https://via.placeholder.com/150x218.jpg',
        'https://via.placeholder.com/150x218.jpg',
        'https://via.placeholder.com/150x218.jpg',
      ],
    },
  ]);
}
