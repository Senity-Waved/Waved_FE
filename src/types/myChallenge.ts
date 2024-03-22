import { TVerificationType } from './verification';

export type TMyChallengeInfo = {
  challengeGroupId: number;
  endDate: string;
  groupTitle: string;
  isGithubConnected?: boolean;
  isReviewed?: boolean | null;
  isVerified?: boolean | null;
  myChallengeId: number;
  startDate: string;
  successCount: number;
  isRefundRequested?: boolean | null;
  isSuccessed?: boolean | null;
  verificationType: TVerificationType;
  deposit: number;
};

export type TMyChallengeStatus = 'PROGRESS' | 'WAITING' | 'COMPLETED';
