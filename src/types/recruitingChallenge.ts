import { TVerificationType } from './verification';

interface IRecruitingChallenge {
  challengeGroupId: number;
  groupTitle: string;
  imageUrl: string;
  verificationType: TVerificationType;
  isFree: boolean;
  participantCount: number;
  startDate: string;
  endDate: string;
  dateDiff: {
    startToToday: number;
    startToEnd: number;
  };
}

export default IRecruitingChallenge;
