import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import ISelectedMyChallenge from '@/types/selectedMyChallenge';

const { persistAtom } = recoilPersist();

const ASelectedMyChallenge = atom<ISelectedMyChallenge>({
  key: 'selectedMyChallenge',
  default: {
    challengeGroupId: '',
    groupTitle: '',
    startDate: '',
    endDate: '',
    verificationType: undefined,
    status: 'PROGRESS',
  },
  effects_UNSTABLE: [persistAtom],
});

export default ASelectedMyChallenge;
