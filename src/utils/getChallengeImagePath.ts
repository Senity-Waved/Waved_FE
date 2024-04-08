import CHALLENGE_IMAGE_PATHS from '@/constants/challengeImagePaths';
import parseChallengeTitle from './parseChallengeTitle';

interface IGetChallengeImagePath {
  title: string;
  type?: 'thumbnail' | 'verification';
}

function getChallengeImagePath({
  title,
  type = 'thumbnail',
}: IGetChallengeImagePath): string | string[] {
  const challengeTitle = parseChallengeTitle(title);
  const challengeInfo = CHALLENGE_IMAGE_PATHS[challengeTitle];

  if (type === 'verification') {
    return challengeInfo.verificationExample || [];
  }
  return (
    challengeInfo.thumbnail ||
    'https://via.placeholder.com/600/E9F1FF/838A94.jpg?text=EMPTY'
  );
}

export default getChallengeImagePath;
