import styled from '@emotion/styled';
import changePriceFormat from '@/utils/changePriceFormat';

interface IDepositItem {
  depositData: {
    challengeName: string;
    challengeResult: string;
    challengeDate: string;
    deposit: number;
  };
}

export default function DepositItem({ depositData }: IDepositItem) {
  return (
    <SDepositItemWrapper>
      <div>
        <SChallengeInfo>
          {depositData.challengeName} ({depositData.challengeResult})
        </SChallengeInfo>
        <SDepositHistoryDate>{depositData.challengeDate}</SDepositHistoryDate>
      </div>
      <SDepositHistory>
        예치금 {depositData.challengeResult === '성공' ? '+' : '-'}
        {changePriceFormat(depositData.deposit)}원
      </SDepositHistory>
    </SDepositItemWrapper>
  );
}

const SDepositItemWrapper = styled.div`
  height: 106px;
  padding: 1.5rem 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray_ec};
  & > div {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
  }
`;

const SChallengeInfo = styled.p`
  font-size: ${({ theme }) => theme.fontSize.body2};
  font-weight: ${({ theme }) => theme.fontWeight.body2};
`;
const SDepositHistoryDate = styled.p`
  font-size: ${({ theme }) => theme.fontSize.caption2};
  font-weight: ${({ theme }) => theme.fontWeight.caption2};
  color: ${({ theme }) => theme.color.gray_70};
`;
const SDepositHistory = styled.p`
  margin-top: 1rem;
  text-align: right;
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
`;
