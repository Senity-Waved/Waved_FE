/* eslint-disable @typescript-eslint/naming-convention */
import styled from '@emotion/styled';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { SLayoutWrapper } from '@/components/common/Layout';
import Btn from '@/components/common/Btn';
import ChallengeSummary from '@/components/challenge/ChallengeSummary';
import { SBottomFixedBtn } from '@/components/common/BottomFixedBtn';
import ASelectedChallenge from '@/atoms/selectedChallenge';
import ISelectedChallenge from '@/types/selectedChallenge';
import changePriceFormat from '@/utils/changePriceFormat';
import paymentSuccessState from '@/atoms/paymentSucceessState';
import {
  IPayments,
  challengePaymentsApi,
} from '@/lib/axios/challengeRequest/api';

export default function ParticipantSuccess() {
  const router = useRouter();
  const { query } = router;
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
  const paidDeposit = query.deposit
    ? changePriceFormat(Number(query.deposit))
    : 0;

  useEffect(() => {
    setChallengeData(recoilChallengeData);
  }, [recoilChallengeData]);

  const { imp_uid, deposit, myChallengeId } =
    useRecoilValue(paymentSuccessState);

  useEffect(() => {
    if (deposit !== 0) {
      if (imp_uid && myChallengeId) {
        const paymentProps: IPayments = {
          paymentResult: {
            imp_uid,
            deposit,
          },
          myChallengeId,
        };

        challengePaymentsApi(paymentProps)
          .then(() => {
            console.log('결제 정보 처리 성공');
          })
          .catch((error) => {
            console.error('결제 정보 처리 실패', error);
          });
      }
    }
  }, [imp_uid, deposit, myChallengeId]);

  return (
    <SParticipantSuccessWrapper noHeader noFooter>
      <Head>
        <title>WAVED | 챌린지 신청</title>
        <meta name="description" content="챌린지 신청 완료" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="a11yHidden">WAVED</h1>
      <main>
        <SParticipantSuccessGuideWrapper>
          <Image
            src="/icons/icon-done.svg"
            width={88}
            height={88}
            priority
            alt="확인 완료 아이콘"
          />
          <SGuideTextWrapper>
            <p>신청완료</p>
            <p>WAVED와 함께 훌륭한 개발자로 도약하세요!</p>
          </SGuideTextWrapper>
        </SParticipantSuccessGuideWrapper>
        <SParticipantSuccessInfoWrapper>
          <ChallengeSummary
            groupTitle={challengeData.groupTitle}
            participantCount={challengeData.participantCount}
            startDate={challengeData.startDate}
            endDate={challengeData.endDate}
            condition={challengeData.condition}
          />
          <SPayDepositWrapper>
            <p>예치금</p>
            <p>{paidDeposit}원</p>
          </SPayDepositWrapper>
        </SParticipantSuccessInfoWrapper>
        <SParticipantSuccessBtnWrapper>
          <Link href="/mychallenge">
            <Btn
              btns={[
                {
                  text: '확인',
                  styleType: 'primary',
                  size: 'large',
                },
              ]}
            />
          </Link>
        </SParticipantSuccessBtnWrapper>
      </main>
    </SParticipantSuccessWrapper>
  );
}

const SParticipantSuccessWrapper = styled(SLayoutWrapper)`
  & main {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    padding-bottom: 7.125rem;
  }
`;

const SParticipantSuccessGuideWrapper = styled.section`
  height: 370px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  border-bottom: 6px solid ${({ theme }) => theme.color.gray_ec};
`;

const SGuideTextWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 52px;
  margin-top: 1rem;

  & p:first-of-type {
    font-size: ${({ theme }) => theme.fontSize.subtitle1};
    font-weight: ${({ theme }) => theme.fontWeight.subtitl1};
    margin-bottom: 0.5rem;
  }

  & p:last-of-type {
    font-size: ${({ theme }) => theme.fontSize.body2};
    font-weight: ${({ theme }) => theme.fontWeight.body2};
    color: ${({ theme }) => theme.color.gray_83};
  }
`;

const SParticipantSuccessInfoWrapper = styled.div`
  height: 144px;
`;

const SPayDepositWrapper = styled.div`
  height: 74px;
  line-height: 74px;
  margin: 0 1.5rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  & p:first-of-type {
    font-size: ${({ theme }) => theme.fontSize.subtitle1};
    font-weight: ${({ theme }) => theme.fontWeight.subtitle1};
    color: ${({ theme }) => theme.color.gray_3c};
  }

  & p:last-of-type {
    font-size: ${({ theme }) => theme.fontSize.body2};
    font-weight: ${({ theme }) => theme.fontWeight.body2};
    color: ${({ theme }) => theme.color.gray_83};
  }
`;

const SParticipantSuccessBtnWrapper = styled(SBottomFixedBtn)`
  a {
    width: 100%;
  }
`;
