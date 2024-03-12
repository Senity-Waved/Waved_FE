import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import styled from '@emotion/styled';
import { SLayoutWrapper } from '@/components/common/Layout';
import Footer from '@/components/common/Footer';
import TopBanner from '@/components/home/TopBanner';
// import ChallengeCardWide from '@/components/home/ChallengeCardWide';
import FloatingBtn from '@/components/home/FloatingBtn';
import HomeHeader from '@/components/home/HomeHeader';
import IRecrutingChallenge from '@/types/recrutingChallenge';
import ChallengeCard from '@/components/home/ChallengeCard';

export default function Home({
  getRecrutingChallenges,
}: {
  getRecrutingChallenges: IRecrutingChallenge[];
}) {
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
            <SListScrollX>
              {/* {challenges.map((challenge) => (
                // 현재 key 속성 누락 콘솔 경고 발생 : Warning: Each child in a list should have a unique "key" prop.
                // 추후 challenge_id 값 받아와 key로 설정해 문제 해결 예정
                // 하단 map들도 같은 목업 데이터를 사용하고 있어 동일 이슈 => uuid를 이용해 임시 대처 진행
                <ChallengeCardWide key={uuidv4()} {...challenge} />
              ))} */}
            </SListScrollX>
          </SSection>
        )}
        <SSection>
          <STitle>
            <h2>✅ 모집 중인 챌린지</h2>
          </STitle>
          <SListGrid>
            {getRecrutingChallenges.map((challenge) => (
              <ChallengeCard key={uuidv4()} {...challenge} />
            ))}
          </SListGrid>
        </SSection>
      </main>
      <FloatingBtn type={isLogined ? 'challengeRequest' : 'register'} />
      <Footer />
    </SHomeWrapper>
  );
}

export async function getStaticProps(): Promise<{
  props: { getRecrutingChallenges: IRecrutingChallenge[] };
}> {
  try {
    const response = await axios.get<IRecrutingChallenge[]>(
      'http://localhost:3000/api/recrutingChallenge',
    );
    const { data } = response;
    return {
      props: {
        getRecrutingChallenges: data,
      },
    };
  } catch (error) {
    console.error('recrutingChallege API GET 실패', error);
    return {
      props: {
        getRecrutingChallenges: [],
      },
    };
  }
}

const SHomeWrapper = styled(SLayoutWrapper)`
  position: relative;
`;

const SSection = styled.section`
  position: relative;
  &:last-of-type::after {
    position: absolute;
    display: inline-block;
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

const SListGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(164px, 1fr));
  grid-row-gap: 1rem;
  grid-column-gap: 0.5rem;
  width: 100%;
  padding: 0 1.25rem;
`;
