interface ISelectedChallenge {
  challengeGroupId: string;
  groupTitle: string;
  startDate: string;
  endDate: string;
  condition: 'closed' | 'recruiting' | 'processing';
  participantCount: number;
  isFree: boolean;
}

export default ISelectedChallenge;
