/* eslint-disable no-nested-ternary */
import styled from '@emotion/styled';
import changePriceFormat from '@/utils/changePriceFormat';
import parseDate from '@/utils/parseDate';
import depositStatus from '@/constants/depositStatus';
import { TDepositStatusKey } from '@/types/deposit';

interface IDepositItem {
  depositData: {
    groupTitle: string;
    status: TDepositStatusKey;
    createDate: string;
    deposit: number;
  };
}

export default function DepositItem({ depositData }: IDepositItem) {
  const [year, month, day] = parseDate(depositData.createDate);

  return (
    <SDepositItemWrapper>
      <div>
        <div>
          <SChallengeInfo>{depositData.groupTitle}</SChallengeInfo>
          <SChallengeStatus challengeStatus={depositData.status}>
            {depositStatus[depositData.status]}
          </SChallengeStatus>
        </div>
        <SDepositHistoryDate>
          {year}년 {month}월 {day}일
        </SDepositHistoryDate>
      </div>
      <SDepositHistory>
        {depositData.status === 'CANCELED' && <span>+</span>}
        {depositData.status === 'APPLIED' && depositData.deposit === 0 && (
          <span>-</span>
        )}
        {changePriceFormat(depositData.deposit)}원
      </SDepositHistory>
    </SDepositItemWrapper>
  );
}

const SDepositItemWrapper = styled.li`
  height: 106px;
  padding: 1.5rem 1.25rem;
  & > div {
    height: 22px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.color.gray_ec};
  }
`;

const SChallengeInfo = styled.p`
  line-height: 22px;
  width: 240px;
  font-size: ${({ theme }) => theme.fontSize.body2};
  font-weight: ${({ theme }) => theme.fontWeight.body2};
`;

const SChallengeStatus = styled.p<{ challengeStatus: TDepositStatusKey }>`
  line-height: 22px;
  width: ${({ challengeStatus }) =>
    challengeStatus === 'APPLIED' ? '46px' : '70px'};
  font-size: ${({ theme }) => theme.fontSize.body2};
  font-weight: ${({ theme }) => theme.fontWeight.body2};
  color: ${({ challengeStatus, theme }) =>
    challengeStatus === 'APPLIED'
      ? theme.color.normal
      : challengeStatus === 'CANCELED'
        ? theme.color.gray_83
        : challengeStatus === 'FAIL'
          ? theme.color.error
          : theme.color.posotive};
  border: 1px solid
    ${({ challengeStatus, theme }) =>
      challengeStatus === 'APPLIED'
        ? theme.color.normal
        : challengeStatus === 'CANCELED'
          ? theme.color.gray_83
          : challengeStatus === 'FAIL'
            ? theme.color.error
            : theme.color.posotive};
  border-radius: 14px;
  text-align: center;
  padding: 2px 2px;
  margin-top: 0.875rem;
  font-size: ${({ theme }) => theme.fontSize.body3};
`;

const SDepositHistoryDate = styled.p`
  flex-shrink: 0;
  font-size: ${({ theme }) => theme.fontSize.caption2};
  font-weight: ${({ theme }) => theme.fontWeight.caption2};
  color: ${({ theme }) => theme.color.gray_70};
  margin-left: 0.625rem;
`;
const SDepositHistory = styled.p`
  margin-top: 1rem;
  text-align: right;
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
`;
