import { useEffect } from 'react';
import styled from '@emotion/styled';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { SLayoutWrapper } from '@/components/common/Layout';
import Footer from '@/components/common/Footer';
import SnackBar from '@/components/common/SnackBar';
import HomeHeader from '@/components/home/HomeHeader';
import TopBanner from '@/components/home/TopBanner';
import FloatingBtn from '@/components/home/FloatingBtn';
import ProcessingChallenge from '@/components/home/ProcessingChallenge';
import RecruitingChallenge from '@/components/home/RecruitingChallenge';
import IRecruitingChallenge from '@/types/recruitingChallenge';
import IMyProcessingChallenge from '@/types/myProcessingChallenge';
import useSnackBar from '@/hooks/useSnackBar';
import {
  getMyProcessingChallengeApi,
  getRecruitingChallengeApi,
} from '@/lib/axios/home/api';
import createServerInstance from '@/lib/axios/serverInstance';
import serverErrorCatch from '@/lib/axios/serverErrorCatch';

interface IHome {
  isLogined: boolean;
  myProcessingChallenges: IMyProcessingChallenge[] | null;
  recruitingChallenges: IRecruitingChallenge[] | null;
  requireSnackBar?: boolean;
  errorMsg?: string;
}

export default function Home({
  isLogined,
  myProcessingChallenges,
  recruitingChallenges,
  requireSnackBar,
  errorMsg,
}: IHome) {
  const router = useRouter();
  const { snackBarData, openSnackBar } = useSnackBar();

  useEffect(() => {
    const handleRedirect = async () => {
      const { redirected, payCancel, payFailure, processFailure } =
        router.query;
      if (redirected) {
        openSnackBar('로그인이 필요한 페이지입니다.');
        await router.replace('/home', undefined, { shallow: true });
      } else if (payCancel) {
        openSnackBar('결제 포기 | 사용자가 결제를 취소하셨습니다.');
        await router.replace('/home', undefined, { shallow: true });
      } else if (payFailure) {
        openSnackBar('결제 실패 | 잠시 후 재시도 바랍니다.');
        await router.replace('/home', undefined, { shallow: true });
      } else if (processFailure) {
        openSnackBar('결제 프로세스가 비정상적으로 종료되었습니다.');
        await router.replace('/home', undefined, { shallow: true });
      }
    };
    handleRedirect().catch((error) => console.error(error));
  }, [router, router.query, openSnackBar]);

  useEffect(() => {
    if (requireSnackBar && errorMsg) {
      openSnackBar(errorMsg);
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
        .then(() => {
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
  }, [requireSnackBar, errorMsg, router, openSnackBar]);

  return (
    <SHomeWrapper>
      <HomeHeader />
      <main>
        <TopBanner />
        {isLogined &&
          myProcessingChallenges &&
          myProcessingChallenges.length > 0 && (
            <ProcessingChallenge
              myProcessingChallenges={myProcessingChallenges}
            />
          )}
        <RecruitingChallenge recruitingChallenges={recruitingChallenges} />
        {snackBarData.open && (
          <SnackBar text={snackBarData.text} type={snackBarData.type} />
        )}
      </main>
      <FloatingBtn type={isLogined ? 'challengeRequest' : 'register'} />
      <Footer />
    </SHomeWrapper>
  );
}

async function getServerSidePropsFunction(
  context: GetServerSidePropsContext,
): Promise<{
  props: {
    isLogined: boolean;
    myProcessingChallenges: IMyProcessingChallenge[] | null;
    recruitingChallenges: IRecruitingChallenge[] | null;
  };
}> {
  const cookieToken = getCookie('accessToken', context);
  const isLogined = !!cookieToken;
  const serverInstance = createServerInstance(context);
  const fetchMyProcessingChallenges = async () => {
    const response = await getMyProcessingChallengeApi(serverInstance);
    return response.data;
  };
  const fetchRecruitingChallenges = async () => {
    const response = await getRecruitingChallengeApi(serverInstance);
    return response.data;
  };
  let myProcessingChallenges = null;
  if (isLogined) {
    myProcessingChallenges = await fetchMyProcessingChallenges();
  }
  const recruitingChallenges = await fetchRecruitingChallenges();
  return {
    props: {
      myProcessingChallenges,
      recruitingChallenges,
      isLogined,
    },
  };
}

export const getServerSideProps = serverErrorCatch(getServerSidePropsFunction);

const SHomeWrapper = styled(SLayoutWrapper)`
  position: relative;
  margin-bottom: 3rem;
`;
