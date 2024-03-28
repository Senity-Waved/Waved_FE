/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import {
  IPayments,
  challengePaymentsApi,
} from '@/lib/axios/challengeRequest/api';
import ASelectedChallenge from '@/atoms/selectedChallenge';

export default function ParticipantProcess() {
  const [myChallengeId, setMyChallengeId] = useState<number | null>(0);
  const [deposit, setDeposit] = useState<number | null>(0);
  const [impUid, setImpUid] = useState<string | null>('');
  const [impSuccess, setImpSuccess] = useState<boolean | null>(false);
  const [errorCode, setErrorCode] = useState<string | null>('');
  const [errorMsg, setErrMsg] = useState<string | null>('');

  const router = useRouter();

  const updateSelectedChallengeData = useSetRecoilState(ASelectedChallenge);

  const increaseParticipantCount = useCallback(() => {
    updateSelectedChallengeData((oldChallengeData) => ({
      ...oldChallengeData,
      participantCount: oldChallengeData.participantCount + 1,
    }));
  }, [updateSelectedChallengeData]);

  useEffect(() => {
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const myChallengeIdParam = urlParams.get('mychallenge_id');
    const depositParam = urlParams.get('deposit');
    const imp_uidParam = urlParams.get('imp_uid');
    const imp_successParam = urlParams.get('imp_success');
    const error_codeParam = urlParams.get('error_code');
    const error_msgParam = urlParams.get('error_msg');

    const isSuccessBoolean =
      imp_successParam === 'true'
        ? true
        : imp_successParam === 'false'
          ? false
          : null;

    if (myChallengeIdParam !== null) {
      setMyChallengeId(parseInt(myChallengeIdParam, 10));
    }
    if (depositParam !== null) {
      setDeposit(parseInt(depositParam, 10));
    }
    if (imp_uidParam !== null) {
      setImpUid(imp_uidParam);
    }
    if (imp_successParam !== null) {
      setImpSuccess(isSuccessBoolean);
    }

    if (error_codeParam !== null) {
      setErrorCode(error_codeParam);
    }

    if (error_msgParam !== null) {
      setErrMsg(error_msgParam);
    }
  }, []);

  useEffect(() => {
    if (impUid && deposit && myChallengeId) {
      const paymentsProps: IPayments = {
        paymentResult: { imp_uid: impUid, deposit },
        myChallengeId,
      };

      if (impSuccess === true) {
        try {
          challengePaymentsApi(paymentsProps)
            .then(() => {
              increaseParticipantCount();
              router
                .push({
                  pathname: '/challenge/participant/success',
                  query: { deposit },
                })
                .catch((error) => {
                  console.error(
                    '결제 및 챌린지 신청 이후 페이지 이동 실패',
                    error,
                  );
                });
            })
            .catch(console.error);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log(`${errorCode} | ${errorMsg}`);
        router
          .push({
            pathname: '/challenge/participant',
            query: { payFailure: true },
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } else {
      console.log('🚨 결제 정보를 받아오지 못했습니다.');
      router.push('/challenge/participant').catch(console.error);
    }
  }, [
    impSuccess,
    errorCode,
    impUid,
    deposit,
    myChallengeId,
    increaseParticipantCount,
    router,
    errorMsg,
  ]);

  return <LoadingSpinner />;
}
