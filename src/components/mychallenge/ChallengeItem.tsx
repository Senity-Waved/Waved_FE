import Link from 'next/link';
import styled from '@emotion/styled';
import { TMyChallengeInfo, TMyChallengeStatus } from '@/types/myChallenge';
import ChallengeProgress from '@/components/mychallenge/ChallengeProgress';
import ChallengeBtn from '@/components/mychallenge/ChallengeBtn';
import parseDate from '@/utils/parseDate';
import changePriceFormat from '@/utils/changePriceFormat';

interface TMyChallengeItem extends Omit<TMyChallengeInfo, 'myChallengeId'> {
  status: TMyChallengeStatus;
}

export default function ChallengeItem({
  status,
  groupId,
  groupTitle,
  startDate,
  endDate,
  successCount,
  isReviewed,
  isVerified,
  verificationType,
  deposit,
}: TMyChallengeItem) {
  const startdate = parseDate(startDate);
  const enddate = parseDate(endDate);

  return (
    <SWrapper>
      <SInfoWrapper>
        <h3>{groupTitle}</h3>
        <div>
          <SDuration>
            {startdate[1]}/{startdate[2]}~{enddate[1]}/{enddate[2]}, 매일
          </SDuration>
          <SDeposit>
            <span>예치금</span>
            <span>{changePriceFormat(deposit)}원</span>
          </SDeposit>
        </div>
      </SInfoWrapper>
      {status === 'progress' && (
        <ChallengeProgress
          successCount={successCount}
          startDate={startDate}
          isVerified={isVerified}
        />
      )}
      <ChallengeBtn
        groupId={groupId}
        isReviewed={isReviewed}
        isVerified={isVerified}
        verificationType={verificationType}
        startDate={startDate}
        status={status}
      />
      <SDetailBtn href={`/challenge/${groupId}`} />
    </SWrapper>
  );
}

const SWrapper = styled.li`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  padding: 1rem;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 0px 2px 15px 0 rgba(35, 62, 112, 0.15);
  border-radius: 8px;
`;

const SDetailBtn = styled(Link)`
  display: block;
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 24px;
  height: 24px;
  background: url('/icons/icon-left-arrow.svg') no-repeat center;
  transform: rotate(180deg);
`;

const SInfoWrapper = styled.div`
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
