import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from '@emotion/styled';
import Layout from '@/components/common/Layout';
import TabMenu from '@/components/common/TabMenu';
import BottomFixedBtn from '@/components/common/BottomFixedBtn';
import ChallengeSummary from '@/components/challenge/ChallengeSummary';

interface IChallengeReview {
  reviewId: number;
  author: string;
  jobTitle?: string;
  createdDate: string;
  context: string;
}

interface IChallenge {
  type: 'write' | 'photo' | 'link' | 'github';
  title: string;
  thumbnail: string;
  description: string;
  participantCount: number;
  startDate: string;
  endDate: string;
  isFree: boolean;
  reviews: IChallengeReview[];
  verificationMethod: string;
  verificationExample: string[];
}

const challengeData: IChallenge = {
  type: 'photo',
  title: '기술 면접 챌린지 1기',
  thumbnail: 'https://via.placeholder.com/600x400.jpg',
  description:
    '자기 개발은 목표를 설정하고 달성하기 위한 여정입니다. 이 블로그 포스트에서는 일상 생활에 쉽게 통합할 수 있는 5가지 핵심 습관을 소개합니다. 첫 번째는 목표 설정과 시간 관리입니다. 이는 개인적 성취와 전문적 성장을 위한 기초를 마련합니다.\n두 번째 습관은 긍정적 사고를 통한 자기 격려입니다. 이는 도전을 극복하고 성공으로 나아가는 데 중요합니다. 세 번째는 건강 유지를 위한 일상적인 운동과 균형 잡힌 식단입니다. 건강한 몸은 능률적인 마음의 기초입니다. 네 번째는 지속적인 학습과 자기 계발입니다. ',
  participantCount: 23,
  startDate: '03월 04일 (월)',
  endDate: '03월 15일 (금)',
  isFree: true,
  reviews: [
    {
      reviewId: 325544,
      author: '서퍼dfk34s',
      jobTitle: '직군',
      createdDate: '2024년 12월 31일',
      context:
        '피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요.',
    },
    {
      reviewId: 8535435,
      author: '닉네임은최대열글자로',
      jobTitle: '프론트엔드',
      createdDate: '2023년 01월 01일',
      context:
        '피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요. 피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요. 피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요. 피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요.',
    },
  ],
  verificationMethod:
    '자기 개발은 목표를 설정하고 달성하기 위한 여정입니다. 이 블로그 포스트에서는 일상 생활에 쉽게 통합할 수 있는 5가지 핵심 습관을 소개합니다. 첫 번째는 목표 설정과 시간 관리입니다. 이는 개인적 성취와 전문적 성장을 위한 기초를 마련합니다.\n두 번째 습관은 긍정적 사고를 통한 자기 격려입니다. 이는 도전을 극복하고 성공으로 나아가는 데 중요합니다. 세 번째는 건강 유지를 위한 일상적인 운동과 균형 잡힌 식단입니다. 건강한 몸은 능률적인 마음의 기초입니다. 네 번째는 지속적인 학습과 자기 계발입니다. ',
  verificationExample: [
    'https://via.placeholder.com/150x218.jpg',
    'https://via.placeholder.com/150x218.jpg',
    'https://via.placeholder.com/150x218.jpg',
  ],
};

export default function Challenge() {
  const router = useRouter();
  const id = typeof router.query.id === 'string' ? router.query.id : '';

  return (
    <Layout
      title="챌린지 상세 정보"
      description="챌린지 상세 정보 페이지 수정해야 함"
    >
      <SImage>
        <Image
          src="https://via.placeholder.com/600x400.jpg"
          alt={id}
          fill
          priority
        />
        <STagList>
          <dt className="a11yHidden">챌린지 인증 빈도</dt>
          <dd>매일</dd>
          <dt className="a11yHidden">챌린지 진행 기한</dt>
          <dd>2주</dd>
          <dt className="a11yHidden">챌린지 인증 방식</dt>
          <dd>사진인증</dd>
        </STagList>
      </SImage>
      <ChallengeSummary condition="recruiting" />
      <SDescription>
        <TabMenu
          positionTop={90}
          tabs={[
            { href: `/challenge/${id}#information`, text: '정보' },
            { href: `/challenge/${id}#review`, text: '후기' },
            { href: `/challenge/${id}#certification`, text: '인증' },
          ]}
        />
      </SDescription>
      <BottomFixedBtn
        btns={[
          {
            text: '화면 하단 고정 버튼',
            styleType: 'primary',
            size: 'large',
          },
        ]}
      />
    </Layout>
  );
}

const SImage = styled.div`
  position: relative;
  width: 100%;
  height: 246px;
  object-fit: cover;
`;

const STagList = styled.dl`
  position: absolute;
  left: 20px;
  bottom: 24px;
  display: flex;
  gap: 8px;
  dd {
    display: inline-block;
    height: 24px;
    padding: 0 0.75rem;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 12px;
    line-height: 24px;
    color: ${({ theme }) => theme.color.gray_ec};
    font-size: ${({ theme }) => theme.fontSize.body4};
    font-weight: ${({ theme }) => theme.fontWeight.body4};
  }
`;

const SDescription = styled.div`
  section {
    position: relative;
    padding: 1.5rem 1.25rem;
    color: ${({ theme }) => theme.color.gray_3c};
    &:not(:last-of-type)::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: block;
      width: 100%;
      height: 6px;
      background-color: ${({ theme }) => theme.color.gray_ec};
    }
  }
`;
