interface IChallengeGroup {
  groupTitle: string;
  participantCount: number;
  startDate: string;
  endDate: string;
  verificationType: 'TEXT' | 'LINK' | 'PICTURE' | 'GITHUB';
  description: string;
  verificationDescription: string;
  isFree: boolean;
  isApplied: boolean;
  challengeId: number;
  myChallengeId: number;
}

export default IChallengeGroup;
