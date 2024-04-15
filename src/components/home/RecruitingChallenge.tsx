import styled from '@emotion/styled';
import RecruitingChallengeCard from '@/components/home/RecruitingChallengeCard';
import EmptyView from '@/components/common/EmptyView';
import IRecruitingChallenge from '@/types/recruitingChallenge';
import calculateDDay from '@/utils/calculateDDay';

export default function RecruitingChallenge({
  recruitingChallenges,
}: {
  recruitingChallenges: IRecruitingChallenge[] | null;
}) {
  const filteredChallenges =
    recruitingChallenges?.filter(
      (challenge) => calculateDDay(challenge.startDate) > 0,
    ) || [];

  return (
    <SSection>
      <STitle>모집 중인 챌린지</STitle>
      {filteredChallenges.length > 0 ? (
        <SList>
          {filteredChallenges.map((challenge) => (
            <RecruitingChallengeCard
              key={challenge.challengeGroupId}
              {...challenge}
            />
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
  display: flex;
  align-items: center;
  gap: 0.375rem;
  width: calc(100% - 2.5rem);
  height: 60px;
  margin: 0 1.25rem;
  color: ${({ theme }) => theme.color.gray_3c};
  line-height: 60px;
  font-size: ${({ theme }) => theme.fontSize.subtitle1};
  font-weight: ${({ theme }) => theme.fontWeight.subtitle1};
  &::before {
    content: '';
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url('/icons/icon-challenge.svg') no-repeat center;
  }
`;

const SList = styled.ul`
  width: 100%;
  padding: 0 1.25rem;
`;
