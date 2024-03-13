import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import ISelectedChallenge from '@/types/selectedChallenge';

const { persistAtom } = recoilPersist();

const ASelectedChallenge = atom<ISelectedChallenge>({
  key: 'selectedChallenge',
  default: {
    challengeGroupId: '',
    groupTitle: '',
    startDate: '',
    endDate: '',
    condition: 'recruiting',
    participantCount: 0,
    isFree: false,
  },
  effects_UNSTABLE: [persistAtom],
});

export default ASelectedChallenge;
