interface IRecrutingChallenge {
  challengeGroupId: number;
  groupTitle: string;
  thumbnail: string;
  verificationType: 'TEXT' | 'LINK' | 'GITHUB' | 'PICTURE';
  isFree: boolean;
  participantCount: number;
  startDate: string;
}

export default IRecrutingChallenge;
