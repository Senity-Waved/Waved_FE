import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import styled from '@emotion/styled';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SLayoutWrapper } from '@/components/common/Layout';
import Footer from '@/components/common/Footer';
import TopBanner from '@/components/home/TopBanner';
import ChallengeCardWide from '@/components/home/ChallengeCardWide';
import FloatingBtn from '@/components/home/FloatingBtn';
import HomeHeader from '@/components/home/HomeHeader';
import RecrutingList from '@/components/home/RecrutingList';
import IChallengeList from '@/types/challengeList';
import HOME_SECTION_TITLE from '@/constants/homeSectionTitle';
import SnackBar from '@/components/common/SnackBar';
import ISnackBarState from '@/types/snackbar';
import IRecruitingChallenge from '@/types/recruitingChallenge';
import IMyProcessingChallenge from '@/types/myProcessingChallenge';
import RecruitingChallenge from '@/components/home/RecruitingChallenge';
import ScrollXBox from '@/components/common/ScrollXBox';

const challengeData: IChallengeList[] = [
  {
    challengeId: 34525,
    title: '프론트엔드 기술 면접 1기',
    thumbnail: 'https://via.placeholder.com/400x600.jpg',
    challengeType: 'frontend',
    isFree: false,
  },
  {
    challengeId: 583545,
    title: '백엔드 기술 면접 1기',
    thumbnail: 'https://via.placeholder.com/400x600.jpg',
    challengeType: 'backend',
    isFree: false,
  },
  {
    challengeId: 17858,
    title: '블로그 포스팅',
    thumbnail: 'https://via.placeholder.com/300x800.jpg',
    challengeType: 'study',
    isFree: false,
  },
  {
    challengeId: 7563,
    title: '깃허브 1일 1커밋',
    thumbnail: 'https://via.placeholder.com/800x500.jpg',
    challengeType: 'study',
    isFree: false,
  },
  {
    challengeId: 9764353,
    title: '핸드폰 하루 6시간',
    thumbnail: 'https://via.placeholder.com/400x600.jpg',
    challengeType: 'life',
    isFree: true,
  },
  {
    challengeId: 47423,
    title: '미라클 모닝',
    thumbnail: 'https://via.placeholder.com/400x600.jpg',
    challengeType: 'life',
    isFree: true,
  },
];

const filteredChallenge = {
  skill: challengeData.filter(
    (challenge) =>
      challenge.challengeType === 'frontend' ||
      challenge.challengeType === 'backend',
  ),
  study: challengeData.filter(
    (challenge) => challenge.challengeType === 'study',
  ),
  life: challengeData.filter((challenge) => challenge.challengeType === 'life'),
};

export default function Home({
  getMyProcessingChallenges,
  getRecruitingChallenges,
}: {
  getMyProcessingChallenges: IMyProcessingChallenge[];
  getRecruitingChallenges: IRecruitingChallenge[];
}) {
  const router = useRouter();
  const [snackBarState, setSnackBarState] = useState<ISnackBarState>({
    open: false,
    text: '',
    type: 'warning',
  });

  useEffect(() => {
    const { redirected } = router.query;

    if (redirected) {
      setSnackBarState({
        open: true,
        text: '로그인이 필요한 페이지입니다.',
        type: 'warning',
      });
      router
        .replace('/', undefined, { shallow: true })
        .catch((error) => console.error(error));
    }
  }, [router, router.query]);

  const isLogined = true; // 로그인된 유저 테스트용 변수
  return (
    <SHomeWrapper>
      <HomeHeader />
      <main>
        <TopBanner />
        {isLogined && (
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
  );
}

export async function getServerSideProps(): Promise<{
  props: {
    getMyProcessingChallenges: IMyProcessingChallenge[];
    getRecruitingChallenges: IRecruitingChallenge[];
  };
}> {
  async function fetchMyProcessingChallenges() {
    try {
      const response = await axios.get<IMyProcessingChallenge[]>(
        'http://localhost:3000/api/myProcessingChallenge',
      );
      return response.data;
    } catch (error) {
      console.error('myProcessingChallenge API GET 실패', error);
      return [];
    }
  }
  async function fetchRecruitingChallenges() {
    try {
      const response = await axios.get<IRecruitingChallenge[]>(
        'http://localhost:3000/api/recruitingChallenge',
      );
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
  &:last-of-type {
    padding-bottom: 5rem;
  }
`;

const STitleLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 2.5rem);
  height: 44px;
  margin: 0.75rem 1.25rem;
  color: ${({ theme }) => theme.color.gray_3c};
  h2 {
    font-size: ${({ theme }) => theme.fontSize.subtitle1};
    font-weight: ${({ theme }) => theme.fontWeight.subtitle1};
  }
  img {
    transform: rotate(180deg);
    display: inline-block;
    width: 24px;
    height: 24px;
  }
`;

const SListScrollX = styled.ul`
  width: 100%;
  overflow-x: auto;
  padding: 0 1.25rem;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
