import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { RecoilEnv, useRecoilValue } from 'recoil';
import Layout from '@/components/common/Layout';
import BottomFixedBtn from '@/components/common/BottomFixedBtn';
import DepositRefundGuide from '@/components/challenge/participant/DepositRefundGuide';
import DepositGuide from '@/components/challenge/participant/DepositGuide';
import ChallengeSummary from '@/components/challenge/ChallengeSummary';
import changePriceFormat from '@/utils/changePriceFormat';
import ASelectedChallenge from '@/atoms/selectedChallenge';
import ISelectedChallenge from '@/types/selectedChallenge';
import ScrollXBox from '@/components/common/ScrollXBox';
import { challengeGroupApplyApi } from '@/lib/axios/challengeRequest/api';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export default function ChallengeParticipant() {
  const router = useRouter();
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

  const filteredDepositAmounts = challengeData.isFree
    ? depositAmounts
    : depositAmounts.filter((amount) => amount !== 0);

  const [deposit, setDeposit] = useState<number>(
    challengeData.isFree ? 0 : 5000,
  );

  const [myChallengeId, setMyChallengeId] = useState(0);

  useEffect(() => {
    setChallengeData(recoilChallengeData);
    setDeposit(challengeData.isFree ? 0 : 5000);
  }, [challengeData.isFree, recoilChallengeData]);

  console.log('myChallengeI: ', myChallengeId);

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

  const challengeGroupApply = async () => {
    try {
      const challengeGroupProps = {
        challengeGroupId: challengeData.challengeGroupId,
        deposit,
      };
      const response = await challengeGroupApplyApi(challengeGroupProps);
      if (response) {
        console.log('myChallengeId: ', response.data);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setMyChallengeId(response.data);
      }
    } catch (error) {
      console.error('challengeGroupApply API 실패', error);
    }
  };

  const goToSuccess = () => {
    challengeGroupApply().catch((error) => console.error(error));
  };

  useEffect(() => {
    if (myChallengeId !== 0) {
      router
        .push({
          pathname: '/challenge/participant/success',
          query: {
            deposit,
          },
        })
        .catch((error) => {
          console.error('페이지 이동에 실패하였습니다.', error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myChallengeId]);

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
