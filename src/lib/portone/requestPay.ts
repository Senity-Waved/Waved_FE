/* eslint-disable @typescript-eslint/naming-convention */
import { RequestPayParams, RequestPayResponse } from '@/types/portone';
import {
  IPayments,
  challengePaymentsApi,
} from '@/lib/axios/challengeParticipant/api';

interface IRequestPayArguments {
  deposit: number;
  myChallengeId: number;
  groupTitle: string;
  nickname: string;
  onSuccess: () => void;
  onFailure: (error: string) => void;
}

const makeMerchantUid = () => {
  const today = new Date();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();
  const milliseconds = today.getMilliseconds();

  return hours + minutes + seconds + milliseconds;
};

const requestPay = ({
  deposit,
  myChallengeId,
  groupTitle,
  nickname,
  onSuccess,
  onFailure,
}: IRequestPayArguments) => {
  if (!window.IMP) return;
  const { IMP } = window;
  const IMP_UID = process.env.NEXT_PUBLIC_IMP_UID ?? '';
  IMP.init(IMP_UID);

  const payData: RequestPayParams = {
    pg: 'kcp.IP0AA',
    pay_method: 'card',
    merchant_uid: `IMP${makeMerchantUid()}`,
    name: groupTitle,
    amount: deposit,
    ...(nickname ? { buyer_name: nickname } : {}),
    m_redirect_url: `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/challenge/process?mychallenge_id=${myChallengeId}&deposit=${deposit}`,
  };

  const callback = (response: RequestPayResponse) => {
    const { success, imp_uid, error_msg } = response;

    if (success && imp_uid) {
      const paymentsProps: IPayments = {
        paymentResult: { imp_uid, deposit },
        myChallengeId,
      };

      challengePaymentsApi(paymentsProps)
        .then(() => onSuccess())
        .catch((error) => console.error(error));
    } else if (error_msg === '[결제포기] 사용자가 결제를 취소하셨습니다') {
      onFailure('사용자 결제 취소');
    } else {
      onFailure(error_msg || '결제 실패');
    }
  };

  IMP.request_pay(payData, callback);
};

export default requestPay;
