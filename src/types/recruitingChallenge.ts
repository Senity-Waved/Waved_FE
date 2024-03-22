interface IRecruitingChallenge {
  challengeGroupId: number;
  groupTitle: string;
  verificationType: 'TEXT' | 'LINK' | 'GITHUB' | 'PICTURE';
  isFree: boolean;
  participantCount: number;
  startDate: string;
}

export default IRecruitingChallenge;
