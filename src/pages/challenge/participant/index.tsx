import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { RecoilEnv, useRecoilValue } from 'recoil';
import Layout from '@/components/common/Layout';
import BottomFixedBtn from '@/components/common/BottomFixedBtn';
import DepositRefundGuide from '@/components/challenge/participant/DepositRefundGuide';
import DepositGuide from '@/components/challenge/participant/DepositGuide';
import paymentMethods from '@/constants/payment';
import ChallengeSummary from '@/components/challenge/ChallengeSummary';
import changePriceFormat from '@/utils/changePriceFormat';
import ASelectedChallenge from '@/atoms/selectedChallenge';
import ISelectedChallenge from '@/types/selectedChallenge';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export default function ChallengeParticipant() {
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState('');
  const depositAmounts = [0, 5000, 10000, 20000, 25000, 30000, 50000, 100000];
  const selectedChallenge =
    useRecoilValue<ISelectedChallenge>(ASelectedChallenge);
  const [challengeData, setChallengeData] = useState<ISelectedChallenge>({
    challengeGroupId: '',
    groupTitle: '',
    startDate: '',
    endDate: '',
    condition: 'recruiting',
    participantCount: 0,
    isFree: false,
  });

  const filteredDepositAmounts = challengeData.isFree
    ? depositAmounts
    : depositAmounts.filter((amount) => amount !== 0);

  const [deposit, setDeposit] = useState<number>(
    challengeData.isFree ? 0 : 5000,
  );

  useEffect(() => {
    setChallengeData(selectedChallenge);
    setDeposit(challengeData.isFree ? 0 : 5000);
  }, [challengeData.isFree, selectedChallenge]);

  const getButtonStyleType = ():
    | 'primary'
    | 'gray'
    | 'white'
    | 'white_line'
    | 'disabled' => {
    if (challengeData.isFree && deposit === 0) {
      return 'primary';
    }
    if (!challengeData.isFree && selectedPayment) {
      return 'primary';
    }
    return 'disabled';
  };

  const buttonStyleType = getButtonStyleType();

  const goToSuccess = () => {
    console.log('챌린지 신청 성공');
    router.push('/challenge/participant/success').catch((error) => {
      console.error('페이지 이동에 실패하였습니다.', error);
    });
  };

  return (
    <Layout
      noFooter
      title="챌린지 신청"
      description="선택한 챌린지의 예치금을 설정하고, 결제를 하는 페이지입니다. 결제를 한 뒤 신청하기 버튼을 누르면 챌린지 신청이 완료됩니다."
    >
      <SChallengeParticipantWrapper>
        <ChallengeSummary
          groupTitle={challengeData.groupTitle}
          participantCount={challengeData.participantCount}
          startDate={challengeData.startDate}
          endDate={challengeData.endDate}
          condition={challengeData.condition}
        />

        <DepositGuide />
        <SDepositSettingWrapper>
          <SDepositAmout>{changePriceFormat(deposit)}원</SDepositAmout>
          <SDepositBtnWrapper>
            {filteredDepositAmounts.map((amount) => (
              <li key={amount}>
                <SDepositBtn
                  isSelectedDeposit={amount === deposit}
                  value={amount}
                  type="button"
                  onClick={() => setDeposit(amount)}
                >
                  <p>
                    {changePriceFormat(amount)}
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
              onClick: goToSuccess,
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
