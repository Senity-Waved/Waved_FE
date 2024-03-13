import { atom } from 'recoil';
import ISelectedChallenge from '@/types/selectedChallenge';

const ASelectedChallenge = atom<ISelectedChallenge>({
  key: 'selectedChallenge',
  default: {
    challengeGroupId: '',
    groupTitle: '',
    startDate: '',
    endDate: '',
    condition: 'processing',
    participantCount: 0,
    isFree: false,
  },
});

export default ASelectedChallenge;
