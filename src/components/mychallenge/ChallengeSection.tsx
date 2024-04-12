import styled from '@emotion/styled';
import ChallengeItem from '@/components/mychallenge/ChallengeItem';
import { TMyChallengeInfo, TMyChallengeStatus } from '@/types/myChallenge';
import mychallengeStatus from '@/constants/mychallengeStatus';

interface IChallengeSection {
  status: TMyChallengeStatus;
  challenges: TMyChallengeInfo[];
  setData?: React.Dispatch<React.SetStateAction<TMyChallengeInfo[]>>;
}

export default function ChallengeSection({
  status,
  challenges,
  setData,
}: IChallengeSection) {
  return (
    <SWrapper id={status}>
      <div>
        <SStatusTitle status={status}>
          {mychallengeStatus[status].title}
        </SStatusTitle>
      </div>
      <SChallengeList>
        {challenges.map((challenge) => (
          <ChallengeItem
            key={challenge.challengeGroupId}
            status={status}
            {...challenge}
            setData={setData}
          />
        ))}
      </SChallengeList>
    </SWrapper>
  );
}

const SWrapper = styled.section`
  padding: 1rem 1.25rem 2rem 1.25rem;
  scroll-margin-top: 98px;
  position: relative;

  &:nth-of-type(2),
  &:nth-of-type(3) {
    padding-top: 1.875rem;
    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 6px;
      background-color: ${({ theme }) => theme.color.gray_ec};
    }
  }
`;

const SStatusTitle = styled.h2<{ status: TMyChallengeStatus }>`
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: ${({ theme }) => theme.fontWeight.headline2};
  color: ${({ theme }) => theme.color.gray_3c};
  display: flex;
  align-items: center;

  &::before {
    display: inline-block;
    content: '';
    width: 1.5rem;
    height: 1.5rem;
    background-image: url(${({ status }) => mychallengeStatus[status].icon});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    margin-right: 0.375rem;
  }
`;

const SChallengeList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;
