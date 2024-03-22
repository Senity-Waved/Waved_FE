import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import { SLayoutWrapper } from '@/components/common/Layout';
import Footer from '@/components/common/Footer';
import TopBanner from '@/components/home/TopBanner';
import ChallengeCardWide from '@/components/home/ChallengeCardWide';
import FloatingBtn from '@/components/home/FloatingBtn';
import HomeHeader from '@/components/home/HomeHeader';
import SnackBar from '@/components/common/SnackBar';
import ISnackBarState from '@/types/snackbar';
import IRecruitingChallenge from '@/types/recruitingChallenge';
import IMyProcessingChallenge from '@/types/myProcessingChallenge';
import RecruitingChallenge from '@/components/home/RecruitingChallenge';
import ScrollXBox from '@/components/common/ScrollXBox';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function Home({
  getMyProcessingChallenges,
  getRecruitingChallenges,
}: {
  getMyProcessingChallenges: IMyProcessingChallenge[];
  getRecruitingChallenges: IRecruitingChallenge[];
}) {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [snackBarState, setSnackBarState] = useState<ISnackBarState>({
    open: false,
    text: '',
    type: 'warning',
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleRedirect = async () => {
      const { redirected } = router.query;
      if (redirected) {
        setSnackBarState({
          open: true,
          text: '로그인이 필요한 페이지입니다.',
          type: 'warning',
        });
        await router.replace('/', undefined, { shallow: true });
      }
      setTimeout(() => {
        setSnackBarState({
          open: false,
          text: '',
        });
      }, 3500);
    };
    handleRedirect().catch((error) => console.error(error));
  }, [router, router.query]);

  const isLogined = getCookie('accessToken');

  return isLoaded ? (
    <SHomeWrapper>
      <HomeHeader />
      <main>
        <TopBanner />
        {isLogined && getMyProcessingChallenges.length !== 0 && (
          <SSection>
            <STitleLink href="/mychallenge">
              <h2>👨‍💻 진행 중인 챌린지</h2>
              <Image
                src="/icons/icon-left-arrow.svg"
                alt="마이 챌린지로 가기"
                width={24}
                height={24}
                style={{ transform: 'rotate(180deg)' }}
                priority
              />
            </STitleLink>
            <ScrollXBox>
              <SListScrollX>
                {getMyProcessingChallenges.map((challenge) => (
                  <ChallengeCardWide key={challenge.groupId} {...challenge} />
                ))}
              </SListScrollX>
            </ScrollXBox>
          </SSection>
        )}
        <RecruitingChallenge
          getRecruitingChallenges={getRecruitingChallenges}
        />
        {snackBarState.open && (
          <SnackBar text={snackBarState.text} type={snackBarState.type} />
        )}
      </main>
      <FloatingBtn type={isLogined ? 'challengeRequest' : 'register'} />
      <Footer />
    </SHomeWrapper>
  ) : (
    <LoadingSpinner />
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<{
  props: {
    getMyProcessingChallenges: IMyProcessingChallenge[];
    getRecruitingChallenges: IRecruitingChallenge[];
  };
}> {
  const cookieToken = getCookie('accessToken', context);
  async function fetchMyProcessingChallenges() {
    try {
      const response = await axios.get<IMyProcessingChallenge[]>(
        'http://127.0.0.1:9000/api/v1/myChallenges?status=PROGRESS',
        {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
          },
        },
      );
      console.log('myProcessingChallenge API GET 성공', response.data);
      return response.data;
    } catch (error) {
      console.error('myProcessingChallenge API GET 실패', error);
      return [];
    }
  }
  async function fetchRecruitingChallenges() {
    try {
      const response = await axios.get<IRecruitingChallenge[]>(
        'http://127.0.0.1:9000/api/v1/challenges/waiting',
      );
      console.log('recruitingChallenge API GET 성공', response.data);
      return response.data;
    } catch (error) {
      console.error('recruitingChallenge API GET 실패', error);
      return [];
    }
  }
  const [myProcessingChallenges, recruitingChallenges] = await Promise.all([
    fetchMyProcessingChallenges(),
    fetchRecruitingChallenges(),
  ]);
  return {
    props: {
      getMyProcessingChallenges: myProcessingChallenges,
      getRecruitingChallenges: recruitingChallenges,
    },
  };
}

const SHomeWrapper = styled(SLayoutWrapper)`
  position: relative;
`;

const SSection = styled.section`
  &::after {
    content: '';
    display: inline-block;
    width: 100%;
    height: 6px;
    margin: 1rem 0;
    background-color: ${({ theme }) => theme.color.gray_ec};
  }
`;

const STitleLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 2.5rem);
  height: 60px;
  margin: 0 1.25rem;
  color: ${({ theme }) => theme.color.gray_3c};
  h2 {
    font-size: ${({ theme }) => theme.fontSize.subtitle1};
    font-weight: ${({ theme }) => theme.fontWeight.subtitle1};
  }
`;

const SListScrollX = styled.ul`
  margin: 0 1.25rem;
`;
