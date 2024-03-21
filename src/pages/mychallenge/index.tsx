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
import Portal from '@/components/modal/ModalPortal';
import Modal from '@/components/modal/Modal';

const progressData: TMyChallengeInfo[] = [
  {
    myChallengeId: 3,
    groupId: 3,
    groupTitle: '백엔드 기술면접 챌린지 2기',
    startDate: '2024-03-11T00:00:00+09:00',
    endDate: '2024-03-24T00:00:00+09:00',
    successCount: 2,
    isReviewed: null,
    isVerified: false,
    verificationType: 'TEXT',
    deposit: 10000,
  },
  {
    myChallengeId: 4,
    groupId: 4,
    groupTitle: '1일 1커밋 챌린지 1기',
    startDate: '2024-03-11T00:00:00+09:00',
    endDate: '2024-03-24T00:00:00+09:00',
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
    startDate: '2024-03-10T00:00:00+09:00',
    endDate: '2024-03-23T00:00:00+09:00',
    successCount: 5,
    isReviewed: null,
    isVerified: false,
    verificationType: 'PICTURE',
    deposit: 5000,
  },
  {
    myChallengeId: 6,
    groupId: 6,
    groupTitle: '프론트엔드 아티클 공유 챌린지 1기',
    startDate: '2024-03-05T00:00:00+09:00',
    endDate: '2024-03-18T00:00:00+09:00',
    successCount: 12,
    isReviewed: null,
    isVerified: false,
    verificationType: 'LINK',
    deposit: 5000,
  },
];

const waitingData: TMyChallengeInfo[] = [
  {
    myChallengeId: 12,
    groupId: 12,
    groupTitle: '백엔드 기술면접 챌린지 3기',
    startDate: '2024-03-25T00:00:00+09:00',
    endDate: '2024-04-07T00:00:00+09:00',
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
    startDate: '2024-03-01T00:00:00+09:00',
    endDate: '2024-03-14T00:00:00+09:00',
    successCount: 14,
    isReviewed: false,
    isVerified: null,
    isSuccessed: true,
    isRefunded: false,
    verificationType: 'TEXT',
    deposit: 20000,
  },
  {
    myChallengeId: 2,
    groupId: 2,
    groupTitle: '스크린타임 4시간 챌린지 1기',
    startDate: '2024-03-01T00:00:00+09:00',
    endDate: '2024-03-14T00:00:00+09:00',
    successCount: 13,
    isReviewed: false,
    isVerified: null,
    isSuccessed: false,
    isRefunded: false,
    verificationType: 'PICTURE',
    deposit: 10000,
  },
  {
    myChallengeId: 15,
    groupId: 15,
    groupTitle: '테스트 챌린지 1기',
    startDate: '2024-01-01T00:00:00+09:00',
    endDate: '2024-01-14T00:00:00+09:00',
    successCount: 13,
    isReviewed: true,
    isVerified: null,
    isSuccessed: true,
    isRefunded: true,
    verificationType: 'PICTURE',
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
          { href: '#PROGRESS', text: '진행 중' },
          { href: '#WAITING', text: '대기 중' },
          { href: '#COMPLETED', text: '진행 완료' },
        ]}
      />

      <div>
        {progressData.length !== 0 && (
          <ChallengeSection
            mainText="🧑🏻‍💻 진행 중"
            status="PROGRESS"
            challenges={progressData}
          />
        )}
        {waitingData.length !== 0 && (
          <ChallengeSection
            mainText="📚 대기 중"
            status="WAITING"
            challenges={waitingData}
          />
        )}
        {completedData.length !== 0 && (
          <ChallengeSection
            mainText="🥳 진행 완료"
            status="COMPLETED"
            challenges={completedData}
          />
        )}
      </div>
      {isEmptyData === 0 && <ChallengeEmptyView />}
      {progressData.length + waitingData.length === 0 &&
        completedData.length !== 0 && (
          <SLinkToHome href="/">챌린지 둘러보기</SLinkToHome>
        )}
      {snackBarState.open && (
        <SnackBar text={snackBarState.text} type={snackBarState.type} />
      )}
      <Portal>
        <Modal />
      </Portal>
    </Layout>
  );
}

const SLinkToHome = styled(Link)`
  font-size: ${({ theme }) => theme.fontSize.body2};
  line-height: 1.5rem;
  font-weight: ${({ theme }) => theme.fontWeight.body2};
  color: ${({ theme }) => theme.color.gray_3c};
  display: block;
  text-align: center;
  margin-bottom: 2rem;
  text-decoration: underline;
  text-underline-offset: 2px;
`;
