export type TMyChallengeInfo = {
  myChallengeId: number;
  groupId: number;
  groupTitle: string;
  startDate: string;
  endDate: string;
  successCount: number;
  isReviewed: boolean | null;
  isTodayVerified: boolean | null;
  verificationType: 'TEXT' | 'GITHUB' | 'PHOTO' | 'LINK';
  deposit: number;
};

export type TMyChallengeStatus = 'progress' | 'waiting' | 'completed';
