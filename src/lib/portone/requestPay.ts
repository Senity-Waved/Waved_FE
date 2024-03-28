/* eslint-disable @typescript-eslint/naming-convention */
import { RequestPayParams, RequestPayResponse } from '@/types/portone';

interface IRequestPayArguments {
  deposit: number;
  myChallengeId: number;
  groupTitle: string;
  nickname: string;
  onSuccess: (imp_uid: string, deposit: number) => void;
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
    pg: 'kcp.IP05D',
    pay_method: 'card',
    merchant_uid: `IMP${makeMerchantUid()}`,
    name: groupTitle,
    amount: deposit,
    ...(nickname ? { buyer_name: nickname } : {}),
    m_redirect_url: `https://waved-fe.azurewebsites.net/challenge/participant/success?deposit=${deposit}`,
  };

  const callback = (response: RequestPayResponse) => {
    const { success, imp_uid, error_msg } = response;

    if (success && imp_uid) {
      onSuccess(imp_uid, deposit);
    } else {
      onFailure(error_msg || '결제실패');
    }
  };

  IMP.request_pay(payData, callback);
};

export default requestPay;
