import styled from '@emotion/styled';
import ChallengeCard from '@/components/home/ChallengeCard';
import EmptyView from '@/components/common/EmptyView';
import IRecruitingChallenge from '@/types/recruitingChallenge';

export default function RecruitingChallenge({
  recruitingChallenges,
}: {
  recruitingChallenges: IRecruitingChallenge[];
}) {
  return (
    <SSection>
      <STitle>✅ 모집 중인 챌린지</STitle>
      {recruitingChallenges.length > 0 ? (
        <SList>
          {recruitingChallenges.map((challenge) => (
            <ChallengeCard key={challenge.challengeGroupId} {...challenge} />
          ))}
        </SList>
      ) : (
        <SEmptyViewWrapper>
          <EmptyView pageType="모집챌린지" />
        </SEmptyViewWrapper>
      )}
    </SSection>
  );
}

const SSection = styled.section``;

const SEmptyViewWrapper = styled.div`
  position: relative;
  height: 340px;
`;

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
