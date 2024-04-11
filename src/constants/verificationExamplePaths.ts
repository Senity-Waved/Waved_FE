const VERIFICATION_EXAMPLE_PATHS: { [key: string]: string[] } = {
  '지원 장벽 낮추기 챌린지': [
    '/images/image-verification-apply-saramin.png',
    '/images/image-verification-apply-wanted.png',
    '/images/image-verification-apply-jumpfit.png',
    '/images/image-verification-apply-jobkorea.png',
    // `https://wavedstorage.blob.core.windows.net/blob/사람인.png${process.env.NEXT_PUBLIC_IMAGE_TOKEN}`,
    // `https://wavedstorage.blob.core.windows.net/blob/원티드.png${process.env.NEXT_PUBLIC_IMAGE_TOKEN}`,
    // `https://wavedstorage.blob.core.windows.net/blob/잡코리아.png${process.env.NEXT_PUBLIC_IMAGE_TOKEN}`,
    // `https://wavedstorage.blob.core.windows.net/blob/점핏.png${process.env.NEXT_PUBLIC_IMAGE_TOKEN}`,
  ],
};

export default VERIFICATION_EXAMPLE_PATHS;
