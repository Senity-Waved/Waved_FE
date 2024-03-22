import Link from 'next/link';
import styled from '@emotion/styled';
import { TMyChallengeInfo, TMyChallengeStatus } from '@/types/myChallenge';
import ChallengeProgress from '@/components/mychallenge/ChallengeProgress';
import ChallengeBtn from '@/components/mychallenge/ChallengeBtn';
import parseDate from '@/utils/parseDate';
import changePriceFormat from '@/utils/changePriceFormat';
import ChallengeLabel from './ChallengeLabel';

interface TMyChallengeItem extends TMyChallengeInfo {
  status: TMyChallengeStatus;
  setData?: React.Dispatch<React.SetStateAction<TMyChallengeInfo[]>>;
}

export default function ChallengeItem({
  status,
  myChallengeId,
  challengeGroupId,
  groupTitle,
  startDate,
  endDate,
  successCount,
  isReviewed,
  isVerified,
  isSuccessed,
  isRefundRequested,
  isGithubConnected,
  verificationType,
  setData,
}: TMyChallengeItem) {
  const [startYY, startMM, startDD] = parseDate(startDate);
  const [endYY, endMM, endDD] = parseDate(endDate);

  return (
    <SWrapper>
      {status === 'COMPLETED' && (
        <ChallengeLabel
          isSuccessed={isSuccessed}
          isRefundRequested={isRefundRequested}
        />
      )}
      <SInfoWrapper>
        <h3>{groupTitle}</h3>
        <div>
          <SDuration>
            {startYY}.{startMM}.{startDD}~{endYY}.{endMM}.{endDD}
          </SDuration>
          <SDeposit>
            <span>예치금</span>
            <span>{changePriceFormat(5000)}원</span>
          </SDeposit>
        </div>
        <SDetailBtn href={`/challenge/${challengeGroupId}`} />
      </SInfoWrapper>
      {status === 'PROGRESS' && (
        <ChallengeProgress
          successCount={successCount}
          startDate={startDate}
          isVerified={isVerified}
        />
      )}
      <ChallengeBtn
        myChallengeId={myChallengeId}
        challengeGroupId={challengeGroupId}
        isReviewed={isReviewed}
        isVerified={isVerified}
        isSuccessed={isSuccessed}
        isRefundRequested={isRefundRequested}
        isGithubConnected={isGithubConnected}
        verificationType={verificationType}
        startDate={startDate}
        status={status}
        setData={setData}
      />
    </SWrapper>
  );
}

const SWrapper = styled.li`
  padding: 1rem;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 0px 2px 15px 0 rgba(35, 62, 112, 0.15);
  border-radius: 8px;
`;

const SDetailBtn = styled(Link)`
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 24px;
  background: url('/icons/icon-left-arrow.svg') no-repeat center;
  transform: rotate(180deg);
`;

const SInfoWrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;

  h3 {
    font-size: ${({ theme }) => theme.fontSize.body2};
    line-height: 1.5rem;
    font-weight: ${({ theme }) => theme.fontWeight.body2};
    color: ${({ theme }) => theme.color.gray_3c};
    margin-bottom: 0.5rem;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    font-size: ${({ theme }) => theme.fontSize.caption2};
    font-weight: ${({ theme }) => theme.fontWeight.caption2};
    color: ${({ theme }) => theme.color.gray_3c};
  }
`;

const SDuration = styled.p``;

const SDeposit = styled.p`
  span:nth-of-type(1) {
    padding-right: 0.5rem;
  }
`;
