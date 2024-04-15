import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { RecoilEnv } from 'recoil';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { SLayoutWrapper } from '@/components/common/Layout';
import Footer from '@/components/common/Footer';
import SnackBar from '@/components/common/SnackBar';
import HomeHeader from '@/components/home/HomeHeader';
import TopBanner from '@/components/home/TopBanner';
import FloatingBtn from '@/components/home/FloatingBtn';
import RecruitingChallenge from '@/components/home/RecruitingChallenge';
import IRecruitingChallenge from '@/types/recruitingChallenge';
import useSnackBar from '@/hooks/useSnackBar';
import getRecruitingChallengeApi from '@/lib/axios/home/api';
import createServerInstance from '@/lib/axios/serverInstance';
import serverErrorCatch from '@/lib/axios/serverErrorCatch';
import { IAuthResponse } from '@/lib/axios/instance';
import calculateDDay from '@/utils/calculateDDay';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

interface IHome {
  isLogined: boolean;
  recruitingChallenges: IRecruitingChallenge[] | null;
  requireSnackBar?: boolean;
  errorMsg?: string;
}

interface ITokenExpiryResponse {
  expiresTime: number;
}

export default function Home({
  isLogined,
  recruitingChallenges,
  requireSnackBar,
  errorMsg,
}: IHome) {
  const router = useRouter();
  const { snackBarData, openSnackBar } = useSnackBar();
  const EventSource = EventSourcePolyfill || NativeEventSource;
  const cookieToken = getCookie('accessToken');
  const [notificationUpdate, setNotificationUpdate] = useState<boolean>(false);
  const [expiresTime, setExpiresTime] = useState<number>(0);
  const [readyReconnect, setReadyReconnect] = useState<boolean>(false);

  useEffect(() => {
    async function fetchTokenExpiry() {
      try {
        const response = await axios.get<ITokenExpiryResponse>(
          '/api/auth/token-expiry',
        );
        const { data } = response;
        setExpiresTime(data.expiresTime);
      } catch (error) {
        console.error(error);
      }
    }
    if (cookieToken) {
      fetchTokenExpiry().catch(console.error);
    }
  }, [cookieToken]);

  useEffect(() => {
    if (expiresTime) {
      const currentTime = Date.now();
      const timeUntilExpiry = expiresTime - currentTime;

      if (timeUntilExpiry < 60000) {
        setReadyReconnect(true);
      }
    }
  }, [expiresTime]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    let eventSource: EventSourcePolyfill;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const connectEventSource = (token: string) => {
      if (eventSource) {
        eventSource.close();
      }
      const urlEndPoint = `${process.env.NEXT_PUBLIC_BASE_URL}/event/subscribe`;
      eventSource = new EventSource(urlEndPoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          Connection: 'keep-alive',
        },
        heartbeatTimeout: 600000,
        withCredentials: true,
      });

      eventSource.addEventListener('event', () => {
        openSnackBar('새로운 알림이 있습니다.', 'notification');
        setNotificationUpdate(true);
      });
    };

    const refreshTokenAndReconnect = async () => {
      try {
        const { data } = await axios.post<IAuthResponse>(
          '/api/auth/reissue',
          {},
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        connectEventSource(data.accessToken);
        timeoutId = setTimeout(
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          refreshTokenAndReconnect,
          60 * 1000 * 9,
        );
      } catch (error) {
        console.error('subscribe 재연결 시 토큰 재발급 실패 | ', error);
      }
    };

    if (cookieToken && !readyReconnect) {
      connectEventSource(cookieToken);
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      timeoutId = setTimeout(refreshTokenAndReconnect, 60 * 1000 * 9);
    } else if (readyReconnect) {
      refreshTokenAndReconnect().catch(console.error);
    }

    return () => {
      if (eventSource) {
        eventSource.close();
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [EventSource, cookieToken, openSnackBar, readyReconnect]);

  useEffect(() => {
    const handleRedirect = async () => {
      const { redirected, payCancel, payFailure, processFailure } =
        router.query;
      if (redirected) {
        openSnackBar('로그인이 필요한 페이지입니다.');
      } else if (payCancel) {
        openSnackBar('결제 포기 | 사용자가 결제를 취소하셨습니다.');
      } else if (payFailure) {
        openSnackBar('결제 실패 | 잠시 후 재시도 바랍니다.');
      } else if (processFailure) {
        openSnackBar('결제 프로세스가 비정상적으로 종료되었습니다.');
      }

      if (redirected || payCancel || payFailure || processFailure) {
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
      <HomeHeader updateKey={notificationUpdate} />
      <main>
        <TopBanner />
        <RecruitingChallenge recruitingChallenges={recruitingChallenges} />
        {snackBarData.open && (
          <SnackBar text={snackBarData.text} type={snackBarData.type} />
        )}
      </main>
      {isLogined || <FloatingBtn />}
      <Footer />
    </SHomeWrapper>
  );
}

async function getServerSidePropsFunction(
  context: GetServerSidePropsContext,
): Promise<{
  props: {
    isLogined: boolean;
    recruitingChallenges: IRecruitingChallenge[] | null;
  };
}> {
  const cookieToken = getCookie('accessToken', context);
  const isLogined = !!cookieToken;
  const serverInstance = createServerInstance(context);
  const fetchRecruitingChallenges = async () => {
    const response = await getRecruitingChallengeApi(serverInstance);
    return response.data;
  };
  const recruitingChallenges = await fetchRecruitingChallenges();
  const enhancedChallenges = recruitingChallenges.map((challenge) => ({
    ...challenge,
    dateDiff: {
      startToToday: calculateDDay(challenge.startDate),
      startToEnd: calculateDDay(challenge.startDate, challenge.endDate),
    },
  }));

  return {
    props: {
      recruitingChallenges: enhancedChallenges,
      isLogined,
    },
  };
}

export const getServerSideProps = serverErrorCatch(getServerSidePropsFunction);

const SHomeWrapper = styled(SLayoutWrapper)`
  position: relative;
  margin-bottom: 3rem;
`;
