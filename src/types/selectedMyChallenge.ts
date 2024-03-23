import { TMyChallengeStatus } from '@/types/myChallenge';
import { TVerificationType } from '@/types/verification';

interface ISelectedMyChallenge {
  challengeGroupId: number | undefined;
  myChallengeId: number;
  groupTitle: string;
  startDate: string;
  endDate: string;
  verificationType: TVerificationType | undefined;
  status: TMyChallengeStatus;
}

export default ISelectedMyChallenge;
