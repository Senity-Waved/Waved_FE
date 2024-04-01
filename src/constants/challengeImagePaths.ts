interface IImagePaths {
  thumbnail: string;
  verificationExample?: string[];
}

const CHALLENGE_IMAGE_PATHS: { [key: string]: IImagePaths } = {
  '백엔드 기술면접 챌린지': {
    thumbnail: '/images/image-challenge-backend.png',
  },
  '프론트엔드 아티클 공유 챌린지': {
    thumbnail: '/images/image-challenge-frontend.png',
  },
  '1일 1커밋 챌린지': {
    thumbnail: '/images/image-challenge-github.png',
  },
  '스크린타임 4시간 챌린지': {
    thumbnail: '/images/image-challenge-nottodo.png',
    verificationExample: [
      '/images/image-verification-nottodo-1.png',
      '/images/image-verification-nottodo-2.png',
      '/images/image-verification-nottodo-3.png',
      '/images/image-verification-nottodo-4.png',
    ],
  },
};

export default CHALLENGE_IMAGE_PATHS;
