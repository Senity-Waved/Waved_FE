import styled from '@emotion/styled';
import { useState } from 'react';
import Layout from '@/components/common/Layout';
import BottomFixedBtn from '@/components/common/BottomFixedBtn';
import DepositRefundGuide from '@/components/challenge/participant/DepositRefundGuide';
import DepositGuide from '@/components/challenge/participant/DepositGuide';
import paymentMethods from '@/constants/payment';

export default function ChallengeParticipant() {
  const [deposit, setDeposit] = useState<number>(5000);
  const [selectedPayment, setSelectedPayment] = useState(
    paymentMethods.CREDITCARD,
  );
  const depositAmounts = [5000, 10000, 20000, 25000, 30000, 50000, 100000];

  const handleChange = (newDeposit: number) => {
    const closestDeposit = depositAmounts.reduce((prev, curr) =>
      Math.abs(curr - newDeposit) < Math.abs(prev - newDeposit) ? curr : prev,
    );
    setDeposit(closestDeposit);
  };

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
              min={depositAmounts[0]}
              max={depositAmounts[depositAmounts.length - 1]}
              step={1}
              value={deposit}
              onChange={(e) => {
                handleChange(e.target.valueAsNumber);
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
        <SPaymentMethodWrapper>
          <SPaymentMethodTitle>결제 수단</SPaymentMethodTitle>
          <SpaymentMethodItemWrapper>
            <SPaymentMethodItem
              type="button"
              isSelectedPayment={selectedPayment === paymentMethods.CREDITCARD}
              onClick={() => setSelectedPayment(paymentMethods.CREDITCARD)}
            >
              <p>신용카드</p>
            </SPaymentMethodItem>
            <SPaymentMethodItem
              type="button"
              isSelectedPayment={selectedPayment === paymentMethods.VIRTUAL}
              onClick={() => setSelectedPayment(paymentMethods.VIRTUAL)}
            >
              <p>가상계좌</p>
            </SPaymentMethodItem>
            <SPaymentMethodItem
              type="button"
              isSelectedPayment={selectedPayment === paymentMethods.KAKAO}
              onClick={() => setSelectedPayment(paymentMethods.KAKAO)}
            >
              <p>카카오페이</p>
            </SPaymentMethodItem>
          </SpaymentMethodItemWrapper>
        </SPaymentMethodWrapper>
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

const SChallengeSummary = styled.section`
  height: 84px;
  background-color: lightblue;
  text-align: center;
`;

const SDepositSettingWrapper = styled.section`
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
  & input[type='range'] {
    -webkit-appearance: none;
    accent-color: ${({ theme }) => theme.color.normal};
    width: 100%;
    height: 8px;
    background: ${({ theme }) => theme.color.light};
    border-radius: 16px;
    outline: none;
  }

  & input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 28px;
    height: 28px;
    background: ${({ theme }) => theme.color.normal};
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  }

  & input[type='range']::-moz-range-thumb {
    width: 28px;
    height: 28px;
    background: ${({ theme }) => theme.color.normal};
    cursor: pointer;
    border-radius: 50%;
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  }

  & input[type='range']::-ms-thumb {
    width: 28px;
    height: 28px;
    background: ${({ theme }) => theme.color.normal};
    cursor: pointer;
    border-radius: 50%;
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  }
`;

const SDepositBtnWrapper = styled.ul`
  display: flex;
  overflow-x: auto;
  margin: 0 1.25rem 2.5rem 1.25rem;
  gap: 14px;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
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

const SPaymentMethodWrapper = styled.section`
  height: 116px;
  margin: 0 1.25rem 2.5rem 1.25rem;
`;
const SPaymentMethodTitle = styled.p`
  height: 74px;
  line-height: 74px;
  font-size: ${({ theme }) => theme.fontSize.subtitle1};
  font-weight: ${({ theme }) => theme.fontWeight.subtitle1};
`;

const SpaymentMethodItemWrapper = styled.div`
  height: 42px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 10px;
`;
const SPaymentMethodItem = styled.button<{ isSelectedPayment: boolean }>`
  padding: 0.625rem 0.375rem;
  font-size: ${({ theme }) => theme.fontSize.body2};
  font-weight: ${({ theme }) => theme.fontWeight.body2};
  color: ${({ theme, isSelectedPayment }) =>
    isSelectedPayment ? theme.color.normal : theme.color.gray_99};
  border: 1px solid
    ${({ theme, isSelectedPayment }) =>
      isSelectedPayment ? theme.color.normal : theme.color.gray_99};
  border-radius: 8px;

  & p {
    width: 94px;
    height: 22px;
    line-height: 22px;
    text-align: center;
  }
`;
