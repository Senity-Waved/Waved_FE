import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

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
  effects_UNSTABLE: [persistAtom],
});

export default paymentSuccessState;
