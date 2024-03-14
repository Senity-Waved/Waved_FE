import styled from '@emotion/styled';
import ChallengeCard from '@/components/home/ChallengeCard';
import IRecruitingChallenge from '@/types/recruitingChallenge';

export default function RecruitingChallenge({
  getRecruitingChallenges,
}: {
  getRecruitingChallenges: IRecruitingChallenge[];
}) {
  return (
    <SSection>
      <STitle>✅ 모집 중인 챌린지</STitle>
      <SList>
        {getRecruitingChallenges.map((challenge) => (
          <ChallengeCard key={challenge.challengeGroupId} {...challenge} />
        ))}
      </SList>
    </SSection>
  );
}

const SSection = styled.section``;

const STitle = styled.h2`
  width: calc(100% - 2.5rem);
  height: 60px;
  margin: 0 1.25rem;
  color: ${({ theme }) => theme.color.gray_3c};
  line-height: 60px;
  font-size: ${({ theme }) => theme.fontSize.subtitle1};
  font-weight: ${({ theme }) => theme.fontWeight.subtitle1};
`;

const SList = styled.ul`
  width: 100%;
  padding: 0 1.25rem;
`;
