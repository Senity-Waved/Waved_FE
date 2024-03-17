import { useState } from 'react';
import styled from '@emotion/styled';
import Layout from '@/components/common/Layout';
import Stamp from '@/components/verification/collection/Stamp';
import VerificationList from '@/components/verification/collection/VerificationList';
import parseDate from '@/utils/parseDate';
import ONE_DAY from '@/constants/day';
import IVerificationInfo from '@/types/verification';
import { useRouter } from 'next/router';

interface IVerificationCollection {
  challengeTitle: string;
  results: number[];
  question?: string;
  verifications: IVerificationInfo[];
  startDate: string;
  endDate: string;
}

const data: IVerificationCollection = {
  challengeTitle: '기술 면접 챌린지 1기',
  results: [1, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  question: '기술 면접 문제 내용입니다.',
  startDate: '2024-03-10T00:00:00+09:00',
  endDate: '2024-03-24T00:00:00+09:00',
  verifications: [
    {
      verificationId: 1,
      authorId: 1,
      authorName: '내계정',
      content:
        '이 아티클에서는 일상 생활에 쉽게 통합할 수 있는 3가지 핵심 습관을 소개합니다. 첫 번째는 목표 설정과 시간 관리입니다. 이는 개인적 성취와 전문적 성장을 위한 기초를 마련합니다. 두 번째 습관은 긍정적 사고를 통한 자기 격려입니다. 이는 도전을 극복하고 성공으로 나아가는 데 중요합니다. 세 번째는 건강 유지를 위한 일상적인 운동과 균형 잡힌 식단입니다. 건강한 몸은 능률적인 마음의 기초입니다. 이러한 습관들은 개인의 성장과 발전에 필수적이며, 이 글을 통해 자기 계발의 길을 찾는 데 도움을 줄 것입니다.',
      link: 'http://senity.com',
      liked: true,
      likeCount: 1,
      time: '2024-03-12T00:00:05+09:00',
    },
    {
      verificationId: 2,
      authorId: 2,
      authorName: '웨이브드11',
      content:
        '이 아티클에서는 여행자가 가져가야 할 4가지 필수 아이템을 상세히 소개합니다. 첫째, 편안한 여행을 위한 양질의 여행 가방. 두 번째는 다양한 환경에 대비할 수 있는 다용도 의류. 세 번째 아이템은 여행 중 긴급 상황에 대비한 응급 키트입니다. 네 번째는 휴대용 충전기와 보조 배터리로, 언제 어디서든 기기를 충전할 수 있게 해줍니다. 이러한 아이템들은 여행자가 만날 수 있는 다양한 상황에 대비할 수 있게 하며, 여행을 더욱 풍부하고 안전하게 만들어 줍니다. 여행을 떠나기 전 이 목록을 체크하고, 최고의 여행 경험을 준비하세요.',
      liked: false,
      likeCount: 2,
      time: '2024-03-12T00:00:04+09:00',
    },
    {
      verificationId: 3,
      authorId: 3,
      authorName: 'starng11df',
      content:
        '이 아티클에서는 여행자가 가져가야 할 4가지 필수 아이템을 상세히 소개합니다.',
      liked: false,
      likeCount: 3,
      time: '2024-03-12T00:00:03+09:00',
    },
    {
      verificationId: 4,
      authorId: 4,
      authorName: '여행가고싶다',
      content:
        '이 아티클에서는 여행자가 가져가야 할 4가지 필수 아이템을 상세히 소개합니다.',
      liked: false,
      likeCount: 4,
      time: '2024-03-12T00:00:02+09:00',
    },
    {
      verificationId: 5,
      authorId: 5,
      authorName: '테스트닉네임',
      content: '답변은 최소 10글자 이상으로 확정',
      liked: false,
      likeCount: 5,
      time: '2024-03-12T00:00:01+09:00',
    },
  ],
};

const data2: IVerificationCollection = {
  challengeTitle: '스크린타임 4시간 챌린지 1기',
  results: [1, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
  question: '',
  startDate: '2024-03-07',
  endDate: '2024-03-21',
  verifications: [
    {
      verificationId: 10,
      authorId: 1,
      authorName: '내계정',
      content: '/images/image-waved-preview1.svg',
      liked: true,
      likeCount: 1,
      time: '2024-03-12T00:00:03+09:00',
    },
    {
      verificationId: 11,
      authorId: 2,
      authorName: '웨이브드2',
      content: '/images/image-waved-preview2.svg',
      liked: false,
      likeCount: 2,
      time: '2024-03-12T00:00:02+09:00',
    },
    {
      verificationId: 12,
      authorId: 3,
      authorName: '웨이브드3',
      content: 'https://via.placeholder.com/150x218.jpg',
      liked: false,
      likeCount: 3,
      time: '2024-03-12T00:00:01+09:00',
    },
  ],
};
export default function VeirificationCollection() {
  const router = useRouter();
  const { groupId } = router.query;
  const { type } = router.query;

  console.log(groupId, type);

  const today = new Date().getTime();
  const [todayYear, todayMonth, todayDay] = parseDate(today);
  const [date, setDate] = useState<number>(today);
  const [year, month, day] = parseDate(date);
  const isToday = parseDate(today).join('-') === `${year}-${month}-${day}`;
  const isStartday = `${year}-${month}-${day}` === data.startDate.split('T')[0];

  const getNextDay = () => setDate(date + ONE_DAY);
  const getPreviousDay = () => setDate(date - ONE_DAY);

  return (
    <Layout
      headerText={data2.challengeTitle}
      title={`인증내역-${data.challengeTitle}`}
      description="챌린지의 인증내역을 확인하는 페이지입니다."
      noFooter
    >
      <SStampWrapper>
        <STitle>📌 내 인증 현황 </STitle>
        <Stamp results={data.results} startDate={data.startDate} />
      </SStampWrapper>
      <SDateWrapper>
        <SDateBtn
          direction="prev"
          onClick={getPreviousDay}
          disabled={isStartday}
        />
        <SDate>
          {year}. {month}. {day}
        </SDate>
        <SDateBtn direction="next" onClick={getNextDay} disabled={isToday} />
      </SDateWrapper>
      <VerificationList
        verificationType="link"
        verifications={data.verifications}
        isToday={isToday}
        question={data.question}
      />
    </Layout>
  );
}

const SStampWrapper = styled.section`
  padding: 1rem 1.25rem 0 1.25rem;
`;

const STitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.headline2};
  line-height: 1.4;
  font-weight: ${({ theme }) => theme.fontWeight.headline2};
  color: ${({ theme }) => theme.color.gray_3c};
`;

const SDateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.25rem;
`;

const SDate = styled.span`
  font-size: ${({ theme }) => theme.fontSize.body2};
  font-weight: ${({ theme }) => theme.fontWeight.body2};
  color: ${({ theme }) => theme.color.gray_3c};
`;

const SDateBtn = styled.button<{ direction: 'prev' | 'next' }>`
  width: 24px;
  height: 24px;
  background: url(/icons/icon-left-arrow.svg) no-repeat center;
  transform: rotate(
    ${({ direction }) => (direction === 'prev' ? '0deg' : '180deg')}
  );

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
