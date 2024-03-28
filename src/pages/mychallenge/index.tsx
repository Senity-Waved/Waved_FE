import { useEffect, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from '@emotion/styled';
import axios from 'axios';
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
import serverErrorCatch from '@/lib/axios/serverErrorCatch';

interface IMyChallenges {
  getMyProgressChallenges?: TMyChallengeInfo[];
  getMyWaitingChallenges?: TMyChallengeInfo[];
  getMyCompletedChallenges?: TMyChallengeInfo[];
  requireSnackBar?: boolean;
  errorMsg?: string;
}

export default function MyChallenge({
  getMyProgressChallenges,
  getMyWaitingChallenges,
  getMyCompletedChallenges,
  requireSnackBar,
  errorMsg,
}: IMyChallenges) {
  const [completedData, setCompletedData] = useState<TMyChallengeInfo[]>(
    getMyCompletedChallenges || [],
  );
  const progressDataLength = getMyProgressChallenges
    ? getMyProgressChallenges.length
    : 0;
  const waitingDataLength = getMyWaitingChallenges
    ? getMyWaitingChallenges.length
    : 0;
  const completedDataLength = completedData ? completedData.length : 0;
  const isEmptyData =
    progressDataLength + waitingDataLength + completedDataLength;

  const router = useRouter();
  const { query } = router;
  const [snackBarState, setSnackBarState] = useState<ISnackBarState>({
    open: false,
    text: '',
  });

  // 스낵바
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

  useEffect(() => {
    if (requireSnackBar && errorMsg) {
      setSnackBarState({
        open: true,
        text: errorMsg,
        type: 'warning',
      });

      setTimeout(() => {
        setSnackBarState({
          open: false,
          text: '',
        });
      }, 3500);
    }
    if (!requireSnackBar && errorMsg === '500') {
      router.push('/500').catch((err) => {
        console.error(err);
      });
    }
    if (
      !requireSnackBar &&
      errorMsg === '다른 위치에서 로그인하여 현재 세션이 로그아웃되었습니다.'
    ) {
      axios
        .post(
          '/api/auth/logout',
          {},
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then((res) => {
          console.log('클라이언트 측에서 로그아웃 처리 성공:', res.data);
          // 로그아웃 처리 후 리다이렉션
          router
            .push({
              pathname: '/',
              query: { forcedLogout: true },
            })
            .catch((err) => {
              console.error('로그아웃 후 온보딩 리디렉션 실패:', err);
            });
        })
        .catch((err) => {
          console.error('클라이언트 측에서 로그아웃 처리 중 오류 발생:', err);
        });
    }
  }, [requireSnackBar, errorMsg, router]);

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
        {progressDataLength !== 0 && (
          <ChallengeSection
            mainText="🧑🏻‍💻 진행 중"
            status="PROGRESS"
            challenges={getMyProgressChallenges || []}
          />
        )}
        {waitingDataLength !== 0 && (
          <ChallengeSection
            mainText="📚 대기 중"
            status="WAITING"
            challenges={getMyWaitingChallenges || []}
          />
        )}
        {completedDataLength !== 0 && (
          <ChallengeSection
            mainText="🥳 진행 완료"
            status="COMPLETED"
            challenges={completedData}
            setData={setCompletedData}
          />
        )}
      </div>
      {isEmptyData === 0 && <ChallengeEmptyView />}
      {progressDataLength + waitingDataLength === 0 &&
        completedDataLength !== 0 && (
          <SLinkToHome href="/home">챌린지 둘러보기</SLinkToHome>
        )}
      {snackBarState.open && (
        <SnackBar text={snackBarState.text} type={snackBarState.type} />
      )}
      <Modal />
    </Layout>
  );
}

async function getServerSidePropsFunction(context: GetServerSidePropsContext) {
  const serverInstance = createServerInstance(context);

  const fetchMyChallenges = async (status: string) => {
    const response = await serverInstance.get<TMyChallengeInfo[]>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/myChallenges?status=${status}`,
    );
    return response.data;
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

export const getServerSideProps = serverErrorCatch(getServerSidePropsFunction);

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
