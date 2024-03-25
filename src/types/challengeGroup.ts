import { TVerificationType } from './verification';

interface IChallengeGroup {
  groupTitle: string;
  participantCount: number;
  startDate: string;
  endDate: string;
  verificationType: TVerificationType;
  description: string;
  verificationDescription: string;
  isFree: boolean;
  isApplied: boolean;
  challengeId: number;
  myChallengeId: number;
}

export default IChallengeGroup;
