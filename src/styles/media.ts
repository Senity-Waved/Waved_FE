import screenSize from '@/constants/screenSize';

const customMediaQueryMin = (maxWidth: number) =>
  `@media (max-width: ${maxWidth}px)`;

const media = {
  mobileMax: customMediaQueryMin(screenSize.max),
  mobileMin: customMediaQueryMin(screenSize.min),
};

export default media;
