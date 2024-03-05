import Image from 'next/image';
import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from '@emotion/styled';

interface IBannerImages {
  src: string;
  alt: string;
}

function CustomDots(dots: React.ReactNode) {
  return <SIndicators>{dots}</SIndicators>;
}

export default function TopBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bannerImages] = useState<IBannerImages[]>([
    {
      src: 'https://via.placeholder.com/375x200.jpg?text=image1',
      alt: '배너이미지1',
    },
    {
      src: 'https://via.placeholder.com/375x200.jpg?text=image2',
      alt: '배너이미지2',
    },
    {
      src: 'https://via.placeholder.com/375x200.jpg?text=image3',
      alt: '배너이미지3',
    },
  ]);

  const settings = {
    dots: true,
    arrows: false,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: CustomDots,
    afterChange: setCurrentIndex,
  };

  return (
    <STopBanner>
      <SSlider {...settings}>
        {bannerImages.map((image) => (
          <SSlides key={image.alt}>
            <Image
              src={image.src}
              alt={image.alt}
              width={375}
              height={200}
              priority
            />
          </SSlides>
        ))}
      </SSlider>
      <SPagination>{`${currentIndex + 1} / ${bannerImages.length}`}</SPagination>
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
  img {
    width: 100%;
    height: auto;
  }
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
  padding: 0 6px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  color: ${({ theme }) => theme.color.gray_f9};
  font-size: ${({ theme }) => theme.fontSize.caption1};
  font-weight: ${({ theme }) => theme.fontWeight.caption1};
  text-align: right;
`;
