export type TCondition = 'closed' | 'recruiting' | 'processing' | 'waiting';

interface ISelectedChallenge {
  challengeGroupId: string;
  groupTitle: string;
  startDate: string;
  endDate: string;
  condition: TCondition;
  participantCount: number;
  isFree: boolean;
}

export default ISelectedChallenge;
