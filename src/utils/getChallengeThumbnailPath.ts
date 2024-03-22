function getChallengeThumbnailPath(title: string): string {
  const titleArr = title.split(' ');
  const challengeTitle = titleArr.splice(0, titleArr.length - 1).join(' ');
  let thumbnailPath = '';
  switch (challengeTitle) {
    case '백엔드 기술면접 챌린지':
      thumbnailPath = '/images/image-challenge-backend.png';
      break;
    case '프론트엔드 아티클 공유 챌린지':
      thumbnailPath = '/images/image-challenge-frontend.png';
      break;
    case '1일 1커밋 챌린지':
      thumbnailPath = '/images/image-challenge-github.png';
      break;
    case '스크린타임 4시간 챌린지':
      thumbnailPath = '/images/image-challenge-nottodo.png';
      break;
    default:
      thumbnailPath = `https://via.placeholder.com/600/E9F1FF/838A94.jpg?text=EMPTY`;
  }
  return thumbnailPath;
}

export default getChallengeThumbnailPath;
