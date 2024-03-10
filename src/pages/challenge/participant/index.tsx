import styled from '@emotion/styled';
import { useState } from 'react';
import Layout from '@/components/common/Layout';
import BottomFixedBtn from '@/components/common/BottomFixedBtn';
import DepositRefundGuide from '@/components/challenge/participant/DepositRefundGuide';
import DepositGuide from '@/components/challenge/participant/DepositGuide';

export default function ChallengeParticipant() {
  const [deposit, setDeposit] = useState<number>(5000);
  const depositAmounts = [5000, 10000, 20000, 25000, 30000, 50000, 100000];

  return (
    <Layout
      noFooter
      title="챌린지 신청"
      description="선택한 챌린지의 예치금을 설정하고, 결제를 하는 페이지입니다. 결제를 한 뒤 신청하기 버튼을 누르면 챌린지 신청이 완료됩니다."
    >
      <SChallengeParticipantWrapper>
        <SChallengeSummary>ChallengeSummary</SChallengeSummary>
        <DepositGuide />
        <SDepositSettingWrapper>
          <SDepositAmout>{deposit.toLocaleString()}원</SDepositAmout>
          <SDepositSliderWrapper>
            <input
              type="range"
              min={5000}
              max={100000}
              step={5000}
              value={deposit}
              onChange={(e) => {
                setDeposit(e.target.valueAsNumber);
              }}
            />
          </SDepositSliderWrapper>
          <SDepositBtnWrapper>
            {depositAmounts.map((amount) => (
              <li key={amount}>
                <SDepositBtn
                  isSelectedDeposit={amount === deposit}
                  value={amount}
                  type="button"
                  onClick={() => setDeposit(amount)}
                >
                  <p>
                    {amount.toLocaleString()}
                    <span>원</span>
                  </p>
                </SDepositBtn>
              </li>
            ))}
          </SDepositBtnWrapper>
        </SDepositSettingWrapper>
        <DepositRefundGuide />
        <BottomFixedBtn
          btns={[
            {
              text: `예치금 ${deposit.toLocaleString()}원 추가하여 신청`,
              styleType: 'primary',
              size: 'large',
            },
          ]}
        />
      </SChallengeParticipantWrapper>
    </Layout>
  );
}

const SChallengeParticipantWrapper = styled.div``;

const SChallengeSummary = styled.div`
  height: 84px;
  background-color: lightblue;
  text-align: center;
`;

const SDepositSettingWrapper = styled.div`
  border-bottom: 6px solid ${({ theme }) => theme.color.gray_ec};
  height: 188px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
`;

const SDepositAmout = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.headline1};
  font-weight: ${({ theme }) => theme.fontWeight.headline1};
  height: 34px;
`;

const SDepositSliderWrapper = styled.div`
  height: 60px;
  line-height: 60px;
  margin: 0 20px;
`;

const SDepositBtnWrapper = styled.ul`
  display: flex;
  overflow-x: auto;
  margin: 0 1.25rem 2.5rem 1.25rem;
  gap: 14px;
`;

const SDepositBtn = styled.button<{ isSelectedDeposit: boolean }>`
  height: 30px;
  padding: 0.25rem 0.625rem;
  border: 1px solid
    ${({ theme, isSelectedDeposit }) =>
      isSelectedDeposit ? theme.color.normal : theme.color.gray_f9};
  border-radius: 32px;
  font-size: ${({ theme }) => theme.fontSize.body2};
  font-weight: ${({ theme }) => theme.fontWeight.body2};
  color: ${({ theme, isSelectedDeposit }) =>
    isSelectedDeposit ? theme.color.white : theme.color.gray_3c};
  background-color: ${({ theme, isSelectedDeposit }) =>
    isSelectedDeposit ? theme.color.normal : theme.color.gray_f9};

  > p {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
  }
`;
