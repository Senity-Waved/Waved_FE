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
  isRefundRequested?: boolean | null; //환급여부
  isSuccessed?: boolean | null; //최종달성여부
  verificationType: TVerificationType; //챌린지 인증타입
  deposit: number; //예치금
};

export type TMyChallengeStatus = 'PROGRESS' | 'WAITING' | 'COMPLETED';
