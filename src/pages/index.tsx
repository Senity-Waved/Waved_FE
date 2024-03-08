import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styled from '@emotion/styled';
import { v4 as uuidv4 } from 'uuid';
import { SLayoutWrapper } from '@/components/common/Layout';
import { SHeaderWrapper } from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import TopBanner from '@/components/home/TopBanner';
import ChallengeCardWide from '@/components/home/ChallengeCardWide';
import ChallengeCard from '@/components/home/ChallengeCard';
import FloatingBtn from '@/components/home/FloatingBtn';

interface IChallenge {
  challengeId: number;
  title: string;
  thumbnail: string;
}

const challengeData: IChallenge[] = [
  {
    challengeId: 34525,
    title: '기술 면접 1기',
    thumbnail: 'https://via.placeholder.com/400x600.jpg',
  },
  {
    challengeId: 341756,
    title: '기술 면접 2기',
    thumbnail: 'https://via.placeholder.com/300x800.jpg',
  },
];

export default function Home() {
  const user = true; // 로그인된 유저 테스트용 변수
  return (
    <SLayoutWrapper>
      <Head>
        <title>WAVED</title>
        <meta
          name="description"
          content="개발직군 취준생들을 위한 챌린지 서비스 WAVED입니다."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SHeader>
        <SLogo>
          <h1 className="a11yHidden">WAVED</h1>
          <Image
            alt="WAVED 로고"
            src="https://via.placeholder.com/100x30.jpg"
            width={100}
            height={30}
          />
        </SLogo>
        <SAlarm type="button" />
      </SHeader>
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
        <SSection>
          <STitle>
            <h2>💻 프론트엔드 챌린지</h2>
            <p>프론트엔드 개발자들을 위한 챌린지</p>
          </STitle>
          <SListGrid>
            {challengeData.map((challenge) => (
              <ChallengeCard key={uuidv4()} {...challenge} />
            ))}
          </SListGrid>
        </SSection>
        <SSection>
          <STitle>
            <h2>👨‍💻 백엔드 챌린지</h2>
            <p>백엔드 개발자들을 위한 챌린지</p>
          </STitle>
          <SListGrid>
            {challengeData.map((challenge) => (
              <ChallengeCard key={uuidv4()} {...challenge} />
            ))}
          </SListGrid>
        </SSection>
        <SSection>
          <STitle>
            <h2>🏃‍♂️ 학습 챌린지</h2>
            <p>확정 텍스트가 필요한 챌린지 챌린지 챌린지</p>
          </STitle>
          <SListGrid>
            {challengeData.map((challenge) => (
              <ChallengeCard key={uuidv4()} {...challenge} />
            ))}
          </SListGrid>
        </SSection>
        <SSection>
          <STitle>
            <h2>🏃‍♂️ 생활 챌린지</h2>
            <p>확정 텍스트가 필요한 챌린지 챌린지 챌린지</p>
          </STitle>
          <SListGrid>
            {challengeData.map((challenge) => (
              <ChallengeCard key={uuidv4()} {...challenge} />
            ))}
          </SListGrid>
        </SSection>
        <FloatingBtn type={user ? 'challengeRequest' : 'register'} />
      </main>
      <Footer />
    </SLayoutWrapper>
  );
}

const SHeader = styled(SHeaderWrapper)`
  justify-content: space-between;
  padding: 0 20px;
`;

const SLogo = styled.div`
  height: 30px;
  line-height: 0;
`;

const SAlarm = styled.button`
  display: inline-block;
  width: 24px;
  height: 24px;
  background: url('/icons/icon-alarm-active.svg') no-repeat center;
`;

const SSection = styled.section`
  &:last-of-type {
    padding-bottom: 80px;
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

const STitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: calc(100% - 2.5rem);
  min-height: 44px;
  margin: 1.5rem 1.25rem;
  color: ${({ theme }) => theme.color.gray_3c};
  h2 {
    line-height: 24px;
    font-size: ${({ theme }) => theme.fontSize.subtitle1};
    font-weight: ${({ theme }) => theme.fontWeight.subtitle1};
  }
  p {
    line-height: 20px;
    font-size: ${({ theme }) => theme.fontSize.body4};
    font-weight: ${({ theme }) => theme.fontWeight.body4};
  }
`;

const SListScrollX = styled.ul`
  width: 100%;
  overflow-x: auto;
  padding: 0 20px;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SListGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(164px, 1fr));
  grid-row-gap: 1rem;
  grid-column-gap: 0.5rem;
  width: 100%;
  padding: 0 1.25rem;
`;
