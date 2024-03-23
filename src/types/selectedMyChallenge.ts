import { TMyChallengeStatus } from '@/types/myChallenge';
import { TVerificationType } from '@/types/verification';

interface ISelectedMyChallenge {
  challengeGroupId: number;
  myChallengeId: number;
  groupTitle: string;
  startDate: string;
  endDate: string;
  verificationType: TVerificationType;
  status: TMyChallengeStatus;
}

export default ISelectedMyChallenge;
