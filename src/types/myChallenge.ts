import { TVerificationType } from './verification';

export type TMyChallengeInfo = {
  myChallengeId: number;
  groupId: number;
  groupTitle: string;
  startDate: string;
  endDate: string;
  successCount: number;
  isReviewed?: boolean | null;
  isVerified?: boolean | null;
  isRefunded?: boolean | null;
  isSuccessed?: boolean | null;
  isGithubConnected?: boolean;
  verificationType: TVerificationType;
  deposit: number;
};

export type TMyChallengeStatus = 'PROGRESS' | 'WAITING' | 'COMPLETED';
