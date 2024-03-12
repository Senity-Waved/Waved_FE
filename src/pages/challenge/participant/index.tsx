import styled from '@emotion/styled';
import { useState } from 'react';
import Layout from '@/components/common/Layout';
import BottomFixedBtn from '@/components/common/BottomFixedBtn';
import DepositRefundGuide from '@/components/challenge/participant/DepositRefundGuide';
import DepositGuide from '@/components/challenge/participant/DepositGuide';
import paymentMethods from '@/constants/payment';
import ChallengeSummary from '@/components/challenge/ChallengeSummary';

export default function ChallengeParticipant() {
  const [selectedPayment, setSelectedPayment] = useState('');
  const depositAmounts = [0, 5000, 10000, 20000, 25000, 30000, 50000, 100000];
  const challengeData = {
    title: '기술면접 챌린지 1기',
    participantCount: 23,
    startDate: '03월 04일 (월)',
    endDate: '03월 15일 (금)',
    isFree: true,
  };
  const [deposit, setDeposit] = useState<number>(
    challengeData.isFree ? 0 : 5000,
  );

  if (!challengeData.isFree) depositAmounts.shift();

  let buttonStyleType: 'primary' | 'gray' | 'white' | 'white_line' | 'disabled';
  if (challengeData.isFree) {
    if (deposit === 0) {
      buttonStyleType = 'primary';
    } else if (deposit !== 0 && selectedPayment) {
      buttonStyleType = 'primary';
    } else {
      buttonStyleType = 'disabled';
    }
  } else {
    buttonStyleType = selectedPayment ? 'primary' : 'disabled';
  }

  return (
    <Layout
      noFooter
      title="챌린지 신청"
      description="선택한 챌린지의 예치금을 설정하고, 결제를 하는 페이지입니다. 결제를 한 뒤 신청하기 버튼을 누르면 챌린지 신청이 완료됩니다."
    >
      <SChallengeParticipantWrapper>
        <ChallengeSummary
          title={challengeData.title}
          participantCount={challengeData.participantCount}
          startDate={challengeData.startDate}
          endDate={challengeData.endDate}
          condition="recruiting"
        />
        <DepositGuide />
        <SDepositSettingWrapper>
          <SDepositAmout>{deposit.toLocaleString()}원</SDepositAmout>
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
          {deposit !== 0 ? (
            <SpaymentMethodItemWrapper>
              <SPaymentMethodItem
                type="button"
                isSelectedPayment={
                  selectedPayment === paymentMethods.CREDITCARD
                }
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
          ) : (
            <SNotPaymentGuide>0원은 결제 수단이 없습니다.</SNotPaymentGuide>
          )}
        </SPaymentMethodWrapper>
        <BottomFixedBtn
          btns={[
            {
              text: '신청하기',
              styleType: buttonStyleType,
              size: 'large',
            },
          ]}
        />
      </SChallengeParticipantWrapper>
    </Layout>
  );
}

const SChallengeParticipantWrapper = styled.div``;

const SDepositSettingWrapper = styled.section`
  border-bottom: 6px solid ${({ theme }) => theme.color.gray_ec};
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
`;

const SDepositAmout = styled.p`
  width: 148px;
  text-align: center;
  margin: 0 auto;
  font-size: ${({ theme }) => theme.fontSize.headline1};
  font-weight: ${({ theme }) => theme.fontWeight.headline1};
  height: 48px;
  line-height: 48px;
  border-bottom: 2px solid ${({ theme }) => theme.color.gray_3c};
`;

const SDepositBtnWrapper = styled.ul`
  display: flex;
  overflow-x: auto;
  margin: 1.5rem 0 2.5rem 1.25rem;
  gap: 0.75rem;
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
    isSelectedDeposit ? theme.color.gray_ec : theme.color.gray_83};
  background-color: ${({ theme, isSelectedDeposit }) =>
    isSelectedDeposit ? theme.color.normal : theme.color.gray_ec};

  > p {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
  }
`;

const SPaymentMethodWrapper = styled.section`
  height: 114px;
  margin: 0 1.25rem 1.5rem 1.25rem;
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
  gap: 0.625rem;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
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
  width: 100%;

  & p {
    width: 94px;
    height: 22px;
    line-height: 22px;
    margin: 0 auto;
  }
`;

const SNotPaymentGuide = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.color.gray_bf};
  font-size: ${({ theme }) => theme.fontSize.subtitle1};
  font-weight: ${({ theme }) => theme.fontWeight.subtitle1};
`;