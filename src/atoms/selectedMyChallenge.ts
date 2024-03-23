import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import ISelectedMyChallenge from '@/types/selectedMyChallenge';

const { persistAtom } = recoilPersist();

const ASelectedMyChallenge = atom<ISelectedMyChallenge>({
  key: 'selectedMyChallenge',
  default: {
    challengeGroupId: 0,
    myChallengeId: 0,
    groupTitle: '',
    startDate: '',
    endDate: '',
    verificationType: 'TEXT',
    status: 'PROGRESS',
  },
  effects_UNSTABLE: [persistAtom],
});

export default ASelectedMyChallenge;
