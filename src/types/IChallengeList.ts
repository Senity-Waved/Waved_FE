interface IChallengeList {
  challengeId: number;
  challengeType: 'frontend' | 'backend' | 'study' | 'life';
  title: string;
  thumbnail: string;
  isFree: boolean;
}

export default IChallengeList;
