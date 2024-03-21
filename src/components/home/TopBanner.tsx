import Image from 'next/image';
import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from '@emotion/styled';
import Link from 'next/link';
import screenSize from '@/constants/screenSize';

interface IBannerItem {
  image: {
    src: string;
    alt: string;
  };
  link?: {
    href: string;
    text: string;
  };
}

const bannerItems: IBannerItem[] = [
  {
    image: {
      src: '/images/image-waved-banner1.png',
      alt: '2주동안 매일 웨이브드와 함께 챌린지를 완주해 보아요!',
    },
    link: {
      href: '#',
      text: '더 알아보기',
    },
  },
  {
    image: {
      src: '/images/image-waved-banner2.png',
      alt: '깃허브 연동하고 1일 1커밋 챌린지 시작하세요!',
    },
    link: {
      href: '/profile',
      text: '지금 연동하기',
    },
  },
  {
    image: {
      src: '/images/image-waved-banner3.png',
      alt: '예치금 환불 안내. 챌린지 당성률 80%를 이루고 예치금을 환불받으세요.',
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
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: CustomDots,
    afterChange: setCurrentIndex,
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
            {item.link && <SLink href={item.link.href}>{item.link.text}</SLink>}
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

const SLink = styled(Link)`
  position: absolute;
  bottom: 50px;
  left: 20px;
  display: inline-block;
  padding: 0 0.5rem;
  background-color: ${({ theme }) => theme.color.gray_3c};
  border-radius: 0.375rem;
  line-height: 30px;
  color: ${({ theme }) => theme.color.gray_de};
  font-size: ${({ theme }) => theme.fontSize.caption1};
  font-weight: ${({ theme }) => theme.fontWeight.caption1};
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
