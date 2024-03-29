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
        <SChallengeInfo>
          {depositData.groupTitle} ({depositStatus[depositData.status]})
        </SChallengeInfo>
        <SDepositHistoryDate>
          {year}년 {month}월 {day}일
        </SDepositHistoryDate>
      </div>
      <SDepositHistory>
        예치금 {changePriceFormat(depositData.deposit)}원
      </SDepositHistory>
    </SDepositItemWrapper>
  );
}

const SDepositItemWrapper = styled.li`
  height: 106px;
  padding: 1.5rem 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray_ec};
  & > div {
    height: 22px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
`;

const SChallengeInfo = styled.p`
  line-height: 22px;
  width: 200px;
  flex: 1;
  font-size: ${({ theme }) => theme.fontSize.body2};
  font-weight: ${({ theme }) => theme.fontWeight.body2};
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
