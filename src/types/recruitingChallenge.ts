import { TVerificationType } from './verification';

interface IRecruitingChallenge {
  challengeGroupId: number;
  groupTitle: string;
  imageUrl: string;
  verificationType: TVerificationType;
  participantCount: number;
  startDate: string;
  endDate: string;
  isFree: boolean;
}

export default IRecruitingChallenge;
