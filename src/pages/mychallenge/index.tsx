import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import Link from 'next/link';
import REVIEW_SNACKBAR_TEXT from '@/constants/reviewSnackBarText';
import ISnackBarState from '@/types/snackbar';
import Layout from '@/components/common/Layout';
import TabMenu from '@/components/common/TabMenu';
import ChallengeSection from '@/components/mychallenge/ChallengeSection';
import ChallengeEmptyView from '@/components/mychallenge/ChallengeEmptyView';
import SnackBar from '@/components/common/SnackBar';
import { TMyChallengeInfo } from '@/types/myChallenge';

const progressData: TMyChallengeInfo[] = [
  {
    myChallengeId: 3,
    groupId: 3,
    groupTitle: '백엔드 기술면접 챌린지 2기',
    startDate: '2024-03-11',
    endDate: '2024-03-24',
    successCount: 2,
    isReviewed: null,
    isVerified: true,
    verificationType: 'TEXT',
    deposit: 10000,
  },
  {
    myChallengeId: 4,
    groupId: 4,
    groupTitle: '1일 1커밋 챌린지 1기',
    startDate: '2024-03-11',
    endDate: '2024-03-24',
    successCount: 5,
    isReviewed: null,
    isVerified: true,
    verificationType: 'GITHUB',
    deposit: 0,
  },
  {
    myChallengeId: 5,
    groupId: 5,
    groupTitle: '스크린타임 4시간 챌린지 2기',
    startDate: '2024-03-10',
    endDate: '2024-03-23',
    successCount: 5,
    isReviewed: null,
    isVerified: false,
    verificationType: 'PHOTO',
    deposit: 5000,
  },
];

const waitingData: TMyChallengeInfo[] = [
  {
    myChallengeId: 12,
    groupId: 12,
    groupTitle: '백엔드 기술면접 챌린지 3기',
    startDate: '2024-03-25',
    endDate: '2024-04-07',
    successCount: 0,
    isReviewed: null,
    isVerified: null,
    verificationType: 'TEXT',
    deposit: 10000,
  },
];

const completedData: TMyChallengeInfo[] = [
  {
    myChallengeId: 1,
    groupId: 1,
    groupTitle: '백엔드 기술면접 챌린지 1기',
    startDate: '2024-03-01',
    endDate: '2024-04-14',
    successCount: 14,
    isReviewed: true,
    isVerified: null,
    verificationType: 'TEXT',
    deposit: 20000,
  },
  {
    myChallengeId: 2,
    groupId: 2,
    groupTitle: '스크린타임 4시간 챌린지 1기',
    startDate: '2024-03-01',
    endDate: '2024-03-14',
    successCount: 13,
    isReviewed: false,
    isVerified: null,
    verificationType: 'PHOTO',
    deposit: 10000,
  },
];

export default function MyChallenge() {
  const router = useRouter();
  const { query } = router;
  const [snackBarState, setSnackBarState] = useState<ISnackBarState>({
    open: false,
    text: '',
  });
  useEffect(() => {
    const handleRouting = (
      snackBarText: string,
      snackBarType: 'correct' | 'warning' = 'correct',
    ): void => {
      setSnackBarState({
        open: true,
        text: snackBarText,
        type: snackBarType,
      });
      router
        .replace('/mychallenge', undefined, { shallow: true })
        .catch((error: Error) =>
          console.error('쿼리스트링 제거 후 페이지 이동 실패', error),
        );
      setTimeout(() => {
        setSnackBarState({
          open: false,
          text: '',
        });
      }, 3500);
    };
    if (query.postReviewSuccess) {
      handleRouting(REVIEW_SNACKBAR_TEXT.POST);
    }
  }, [query, router]);
  const isEmptyData =
    progressData.length + waitingData.length + completedData.length;
  return (
    <Layout
      headerText="MY 챌린지"
      title="마이챌린지"
      description="나의 챌린지 내역을 확인해보세요."
    >
      <TabMenu
        tabs={[
          { href: '#progress', text: '진행 중' },
          { href: '#waiting', text: '대기 중' },
          { href: '#completed', text: '진행 완료' },
        ]}
      />

      <div>
        {progressData.length !== 0 && (
          <ChallengeSection
            mainText="🧑🏻‍💻 진행 중"
            status="progress"
            challenges={progressData}
          />
        )}
        {waitingData.length !== 0 && (
          <ChallengeSection
            mainText="📚 대기 중"
            status="waiting"
            challenges={waitingData}
          />
        )}
        {completedData.length !== 0 && (
          <ChallengeSection
            mainText="🥳 진행 완료"
            status="completed"
            challenges={completedData}
          />
        )}
      </div>
      {isEmptyData === 0 && <ChallengeEmptyView />}
      {snackBarState.open && (
        <SnackBar text={snackBarState.text} type={snackBarState.type} />
      )}
      <Link href="/">
        <SLinkToHome>챌린지 둘러보기</SLinkToHome>
      </Link>
    </Layout>
  );
}

const SLinkToHome = styled.span`
  font-size: ${({ theme }) => theme.fontSize.body2};
  line-height: 1.5rem;
  font-weight: ${({ theme }) => theme.fontWeight.body2};
  color: ${({ theme }) => theme.color.gray_3c};
  display: block;
  text-align: center;
  margin-bottom: 2rem;
  text-decoration: underline;
`;
