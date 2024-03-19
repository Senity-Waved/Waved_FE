/* eslint-disable @typescript-eslint/naming-convention */
import { RequestPayParams, RequestPayResponse } from 'iamport-typings';

const makeMerchantUid = () => {
  const today = new Date();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();
  const milliseconds = today.getMilliseconds();

  return hours + minutes + seconds + milliseconds;
};

export default function PayTest() {
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
      amount: 100,
      buyer_email: 'waved222@google.com',
      buyer_name: '신짱구',
      buyer_addr: '서울특별시 광화문역',
      buyer_tel: '010-0000-0000',
      m_redirect_url: 'http://localhost:3000/paytest',
    };

    IMP.request_pay(payData, callback);

    function callback(response: RequestPayResponse) {
      const { success, imp_uid, error_msg } = response;
      if (success) {
        console.log('결제 성공');
        console.log('백엔드에 imp_uid 전송', imp_uid);
      } else {
        console.log(error_msg);
      }
    }
  }

  return (
    <div>
      <button type="button" onClick={requestPay}>
        결제하기
      </button>
    </div>
  );
}
