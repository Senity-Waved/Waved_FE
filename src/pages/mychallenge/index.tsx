import { useEffect, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from '@emotion/styled';
import REVIEW_SNACKBAR_TEXT from '@/constants/reviewSnackBarText';
import ISnackBarState from '@/types/snackbar';
import { TMyChallengeInfo } from '@/types/myChallenge';
import Layout from '@/components/common/Layout';
import TabMenu from '@/components/common/TabMenu';
import ChallengeSection from '@/components/mychallenge/ChallengeSection';
import ChallengeEmptyView from '@/components/mychallenge/ChallengeEmptyView';
import SnackBar from '@/components/common/SnackBar';
import Modal from '@/components/modal/Modal';
import createServerInstance from '@/lib/axios/serverInstance';

interface IMyChallenges {
  getMyProgressChallenges: TMyChallengeInfo[];
  getMyWaitingChallenges: TMyChallengeInfo[];
  getMyCompletedChallenges: TMyChallengeInfo[];
}

export default function MyChallenge({
  getMyProgressChallenges,
  getMyWaitingChallenges,
  getMyCompletedChallenges,
}: IMyChallenges) {
  const [progressData, setProgressData] = useState<TMyChallengeInfo[]>(
    getMyProgressChallenges,
  );
  const [completedData, setCompletedData] = useState<TMyChallengeInfo[]>(
    getMyCompletedChallenges,
  );
  const router = useRouter();
  const { query } = router;
  const [snackBarState, setSnackBarState] = useState<ISnackBarState>({
    open: false,
    text: '',
  });

  console.log(
    getMyProgressChallenges,
    getMyWaitingChallenges,
    getMyCompletedChallenges,
  );

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
    progressData.length + getMyWaitingChallenges.length + completedData.length;
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
            setData={setProgressData}
          />
        )}
        {getMyWaitingChallenges.length !== 0 && (
          <ChallengeSection
            mainText="📚 대기 중"
            status="WAITING"
            challenges={getMyWaitingChallenges}
          />
        )}
        {completedData.length !== 0 && (
          <ChallengeSection
            mainText="🥳 진행 완료"
            status="COMPLETED"
            challenges={completedData}
            setData={setCompletedData}
          />
        )}
      </div>
      {isEmptyData === 0 && <ChallengeEmptyView />}
      {progressData.length + getMyWaitingChallenges.length === 0 &&
        completedData.length !== 0 && (
          <SLinkToHome href="/home">챌린지 둘러보기</SLinkToHome>
        )}
      {snackBarState.open && (
        <SnackBar text={snackBarState.text} type={snackBarState.type} />
      )}
      <Modal />
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const serverInstance = createServerInstance(context);

  const fetchMyChallenges = async (status: string) => {
    try {
      const response = await serverInstance.get<TMyChallengeInfo[]>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/myChallenges?status=${status}`,
      );
      return response.data;
    } catch (error) {
      console.error(`my${status}Challenge API 실패`, error);
      return [];
    }
  };

  const [myProgressChallenges, myWaitingChallenges, myCompletedChallenges] =
    await Promise.all([
      fetchMyChallenges('PROGRESS'),
      fetchMyChallenges('WAITING'),
      fetchMyChallenges('COMPLETED'),
    ]);
  return {
    props: {
      getMyProgressChallenges: myProgressChallenges,
      getMyWaitingChallenges: myWaitingChallenges,
      getMyCompletedChallenges: myCompletedChallenges,
    },
  };
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
