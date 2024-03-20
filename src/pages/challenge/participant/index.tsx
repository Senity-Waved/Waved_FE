/* eslint-disable @typescript-eslint/naming-convention */
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
import { RecoilEnv, useRecoilValue } from 'recoil';
import { RequestPayParams, RequestPayResponse } from 'iamport-typings';
import Layout from '@/components/common/Layout';
import BottomFixedBtn from '@/components/common/BottomFixedBtn';
import DepositRefundGuide from '@/components/challenge/participant/DepositRefundGuide';
import DepositGuide from '@/components/challenge/participant/DepositGuide';
import ChallengeSummary from '@/components/challenge/ChallengeSummary';
import changePriceFormat from '@/utils/changePriceFormat';
import ASelectedChallenge from '@/atoms/selectedChallenge';
import ISelectedChallenge from '@/types/selectedChallenge';
import ScrollXBox from '@/components/common/ScrollXBox';
import {
  IPayments,
  challengeGroupApplyApi,
  challengePaymentsApi,
} from '@/lib/axios/challengeRequest/api';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

const makeMerchantUid = () => {
  const today = new Date();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();
  const milliseconds = today.getMilliseconds();

  return hours + minutes + seconds + milliseconds;
};

export default function ChallengeParticipant() {
  // const router = useRouter();

  const depositAmounts = [0, 5000, 10000, 20000, 25000, 30000, 50000, 100000];
  const recoilChallengeData =
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

  const [myChallengeId, setMyChallengeId] = useState(0);

  const filteredDepositAmounts = challengeData.isFree
    ? depositAmounts
    : depositAmounts.filter((amount) => amount !== 0);

  const [deposit, setDeposit] = useState<number>(
    challengeData.isFree ? 0 : 5000,
  );

  useEffect(() => {
    setChallengeData(recoilChallengeData);
    setDeposit(challengeData.isFree ? 0 : 5000);
  }, [challengeData.isFree, recoilChallengeData]);

  const getButtonStyleType = ():
    | 'primary'
    | 'gray'
    | 'white'
    | 'white_line'
    | 'disabled' => {
    if (challengeData.isFree && deposit === 0) {
      return 'primary';
    }

    if (!challengeData.isFree && deposit !== 0) {
      return 'primary';
    }

    return 'disabled';
  };

  const buttonStyleType = getButtonStyleType();

  useEffect(() => {
    if (myChallengeId !== 0) {
      requestPay();
      console.log('mychallengeId 바뀌고 나서 requestPay()실행');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myChallengeId]);

  function requestPay() {
    if (!window.IMP) return;
    const { IMP } = window;
    const IMP_UID = process.env.NEXT_PUBLIC_IMP_UID ?? '';
    IMP.init(IMP_UID);

    const payData: RequestPayParams = {
      pg: 'kcp.IP05D',
      pay_method: 'card',
      merchant_uid: `IMP${makeMerchantUid()}`,
      name: 'waved 챌린지',
      amount: deposit,
      buyer_email: 'waved222@google.com',
      buyer_name: '신짱구',
      buyer_addr: '서울특별시 광화문역',
      buyer_tel: '010-0000-0000',
      m_redirect_url: 'http://localhost:3000/challenge/participant/success',
    };

    IMP.request_pay(payData, callback);

    function callback(response: RequestPayResponse) {
      const { success, imp_uid, error_msg } = response;

      if (success && imp_uid) {
        const paymentsProps: IPayments = {
          paymentResult: { imp_uid, deposit },
          myChallengeId,
        };

        const paymentsResponse = challengePaymentsApi(paymentsProps);

        console.log(paymentsResponse);
      } else {
        console.log(error_msg);
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  const paymentCheck = async () => {
    try {
      const response = await challengeGroupApplyApi(deposit).catch((error) =>
        console.error('challengeGroupAPI 실패', error),
      );
      if (response) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setMyChallengeId(response.data);
        console.log('mychallengeId 전달받음.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const goToSuccess = () => {
    paymentCheck().catch((error) => console.error(error));
    // router
    //   .push({
    //     pathname: '/challenge/participant/success',
    //     query: {
    //       deposit,
    //     },
    //   })
    //   .catch((error) => {
    //     console.error('페이지 이동에 실패하였습니다.', error);
    //   });
  };

  return (
    <Layout
      noFooter
      withBottomFixedBtn
      title="챌린지 신청"
      description="선택한 챌린지의 예치금을 설정하고, 결제를 하는 페이지입니다. 결제를 한 뒤 신청하기 버튼을 누르면 챌린지 신청이 완료됩니다."
    >
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
        <ScrollXBox>
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
        </ScrollXBox>
      </SDepositSettingWrapper>
      <DepositRefundGuide />
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
    </Layout>
  );
}

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
  margin: 1.5rem 0 2.5rem 1.25rem;
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

  margin-right: 0.75rem;

  > p {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
  }
`;
