import Image from 'next/image';
import { useState } from 'react';
import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import screenSize from '@/constants/screenSize';

interface IBannerItem {
  image: {
    src: string;
    alt: string;
  };
}

const bannerItems: IBannerItem[] = [
  {
    image: {
      src: '/images/image-waved-banner1.png',
      alt: '개발자로 이끌 챌린지의 파도, WAVED! 서퍼가 되어 도전하세요!',
    },
  },
  {
    image: {
      src: '/images/image-waved-banner2.png',
      alt: '챌린지 달성률 80% 이상이면 예치금을 환급받을 수 있어요!',
    },
  },
  {
    image: {
      src: '/images/image-waved-banner3.png',
      alt: '내가 원하는 챌린지가 없다면 문의하기를 통해 챌린지 개설을 요청할 수 있어요!',
    },
  },
];

function CustomDots(dots: React.ReactNode) {
  return <SIndicators>{dots}</SIndicators>;
}

export default function TopBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const settings = {
    dots: true,
    arrows: false,
    autoplay: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: CustomDots,
    afterChange: setCurrentIndex,
    accessibility: true,
  };

  return (
    <STopBanner>
      <SSlider {...settings}>
        {bannerItems.map((item) => (
          <SSlides key={item.image.alt}>
            <Image
              src={item.image.src}
              alt={item.image.alt}
              fill
              sizes={`${screenSize.max}px`}
              style={{ objectFit: 'cover' }}
              priority
            />
          </SSlides>
        ))}
      </SSlider>
      <SPagination>{`${currentIndex + 1} / ${bannerItems.length}`}</SPagination>
    </STopBanner>
  );
}

const STopBanner = styled.article`
  width: 100%;
`;

const SSlider = styled(Slider)`
  position: relative;
  width: 100%;
  line-height: 0;
  .slick-slide div {
    outline: 0;
  }
`;

const SSlides = styled.div`
  position: relative;
  width: 100%;
  height: 230px;
`;

const SIndicators = styled.ul`
  position: absolute;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  &.slick-dots li {
    width: 6px;
    height: 6px;
    margin: 0 2px;
    button {
      width: 6px;
      height: 6px;
      padding: 0;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 50%;
      transition: background-color 0.3s;
      &::before {
        content: none;
      }
    }
    &.slick-active button {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
`;

const SPagination = styled.span`
  position: absolute;
  top: 16px;
  right: 16px;
  height: 20px;
  line-height: 20px;
  padding: 0 0.375rem;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  color: ${({ theme }) => theme.color.gray_f9};
  font-size: ${({ theme }) => theme.fontSize.caption1};
  font-weight: ${({ theme }) => theme.fontWeight.caption1};
  text-align: right;
`;
