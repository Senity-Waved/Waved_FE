import styled from '@emotion/styled';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/common/Layout';
import TopBanner from '@/components/home/TopBanner';
import ChallengeCardWide from '@/components/home/ChallengeCardWide';

const myData = [
  {
    challenge_id: 34525,
    title: '기술 면접 1기',
    thumbnail: 'https://via.placeholder.com/198x108.jpg',
  },
  {
    challenge_id: 341756,
    title: '기술 면접 2기',
    thumbnail: 'https://via.placeholder.com/198x108.jpg',
  },
  {
    challenge_id: 69565,
    title: '챌린지챌린지챌린지챌린지챌린지챌린지',
    thumbnail: 'https://via.placeholder.com/198x108.jpg',
  },
  {
    challenge_id: 154654,
    title: '챌린지챌린지챌린지챌린지챌린지챌린지',
    thumbnail: 'https://via.placeholder.com/198x108.jpg',
  },
];

export default function Home() {
  return (
    <Layout headerText="WAVED">
      <TopBanner />
      <section>
        <STitle>
          <h2>진행 중인 챌린지</h2>
          <SLink href="/mychallenge">
            <Image
              src="/icons/icon-left-arrow.svg"
              alt="마이 챌린지로 가기"
              width={24}
              height={24}
              priority
            />
          </SLink>
        </STitle>
        <SListScrollX>
          {myData.map((challenge) => (
            <ChallengeCardWide {...challenge} />
          ))}
        </SListScrollX>
      </section>
      <section>
        <STitle>
          <h2>💻 프론트엔드 챌린지</h2>
          <p>프론트엔드 개발자들을 위한 챌린지</p>
        </STitle>
      </section>
      <section>
        <STitle>
          <h2>👨‍💻 백엔드 챌린지</h2>
          <p>백엔드 개발자들을 위한 챌린지</p>
        </STitle>
      </section>
      <section>
        <STitle>
          <h2>🏃‍♂️ 학습 챌린지</h2>
          <p>확정 텍스트가 필요한 챌린지 챌린지 챌린지</p>
        </STitle>
      </section>
      <section>
        <STitle>
          <h2>🏃‍♂️ 생활 챌린지</h2>
          <p>확정 텍스트가 필요한 챌린지 챌린지 챌린지</p>
        </STitle>
      </section>
    </Layout>
  );
}

const STitle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 92px;
  padding: 1.5rem 1.25rem;
  color: ${({ theme }) => theme.color.gray_3c};
  h2 {
    font-size: ${({ theme }) => theme.fontSize.subtitle1};
    font-weight: ${({ theme }) => theme.fontWeight.subtitle1};
  }
  p {
    font-size: ${({ theme }) => theme.fontSize.body4};
    font-weight: ${({ theme }) => theme.fontWeight.body4};
  }
`;

const SLink = styled(Link)`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  display: inline-block;
  width: 24px;
  height: 24px;
  img {
    transform: rotate(180deg);
  }
`;

const SListScrollX = styled.ul`
  width: 100%;
  overflow-x: auto;
  padding: 0 20px;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  /* 스크롤바 미노출 */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
`;
