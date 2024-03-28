import { atom } from 'recoil';

interface IPaymentSuccessInfo {
  imp_uid: string;
  deposit: number;
  myChallengeId: number;
}

const paymentSuccessState = atom<IPaymentSuccessInfo>({
  key: 'paymentSuccessState',
  default: {
    imp_uid: '',
    deposit: 0,
    myChallengeId: 0,
  },
});

export default paymentSuccessState;
