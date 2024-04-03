import Link from 'next/link';
import Image from 'next/image';
import styled from '@emotion/styled';
import ScrollXBox from '@/components/common/ScrollXBox';
import ProcessingChallengeCard from '@/components/home/ProcessingChallengeCard';
import IMyProcessingChallenge from '@/types/myProcessingChallenge';

export default function ProcessingChallenge({
  myProcessingChallenges,
}: {
  myProcessingChallenges: IMyProcessingChallenge[];
}) {
  return (
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
          {myProcessingChallenges.map((challenge) => (
            <ProcessingChallengeCard
              key={challenge.challengeGroupId}
              {...challenge}
            />
          ))}
        </SListScrollX>
      </ScrollXBox>
    </SSection>
  );
}

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
