import Link from 'next/link';
import Image from 'next/image';
import styled from '@emotion/styled';
import { v4 as uuidv4 } from 'uuid';
import { SLayoutWrapper } from '@/components/common/Layout';
import Footer from '@/components/common/Footer';
import TopBanner from '@/components/home/TopBanner';
import ChallengeCardWide from '@/components/home/ChallengeCardWide';
import FloatingBtn from '@/components/home/FloatingBtn';
import HomeHeader from '@/components/home/HomeHeader';
import RecrutingList from '@/components/home/RecrutingList';
import IChallengeList from '@/types/challengeList';
import HOME_SECTION_TITLE from '@/constants/homeSectionTitle';

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

export default function Home() {
  const user = true; // 로그인된 유저 테스트용 변수
  return (
    <SHomeWrapper>
      <HomeHeader />
      <main>
        <TopBanner />
        <SSection>
          <STitleLink href="/mychallenge">
            <h2>진행 중인 챌린지</h2>
            <Image
              src="/icons/icon-left-arrow.svg"
              alt="마이 챌린지로 가기"
              width={24}
              height={24}
              priority
            />
          </STitleLink>
          <SListScrollX>
            {challengeData.map((challenge) => (
              // 현재 key 속성 누락 콘솔 경고 발생 : Warning: Each child in a list should have a unique "key" prop.
              // 추후 challenge_id 값 받아와 key로 설정해 문제 해결 예정
              // 하단 map들도 같은 목업 데이터를 사용하고 있어 동일 이슈 => uuid를 이용해 임시 대처 진행
              <ChallengeCardWide key={uuidv4()} {...challenge} />
            ))}
          </SListScrollX>
        </SSection>
        <RecrutingList
          title={HOME_SECTION_TITLE.SKILL.main}
          subtitle={HOME_SECTION_TITLE.SKILL.sub}
          challenges={filteredChallenge.skill}
        />
        <RecrutingList
          title={HOME_SECTION_TITLE.STUDY.main}
          subtitle={HOME_SECTION_TITLE.STUDY.sub}
          challenges={filteredChallenge.study}
        />
        <RecrutingList
          title={HOME_SECTION_TITLE.LIFE.main}
          subtitle={HOME_SECTION_TITLE.LIFE.sub}
          challenges={filteredChallenge.life}
        />
      </main>
      <FloatingBtn type={user ? 'challengeRequest' : 'register'} />
      <Footer />
    </SHomeWrapper>
  );
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
