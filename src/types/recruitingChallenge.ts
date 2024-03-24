import { TVerificationType } from './verification';

interface IRecruitingChallenge {
  challengeGroupId: number;
  groupTitle: string;
  verificationType: TVerificationType;
  isFree: boolean;
  participantCount: number;
  startDate: string;
}

export default IRecruitingChallenge;
