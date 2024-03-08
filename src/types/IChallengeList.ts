interface IChallengeList {
  challengeId: number;
  challengeType: 'frontend' | 'backend' | 'study' | 'life';
  title: string;
  thumbnail: string;
}

export default IChallengeList;
