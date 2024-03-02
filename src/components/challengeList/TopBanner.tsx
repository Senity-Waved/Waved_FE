import { useState, useEffect } from 'react';
import styled from '@emotion/styled';

interface IBannerImages {
  src: string;
  alt: string;
}

export default function TopBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bannerImages] = useState<IBannerImages[]>([
    {
      src: 'https://via.placeholder.com/430x200.jpg?text=image1',
      alt: '배너이미지1',
    },
    {
      src: 'https://via.placeholder.com/430x200.jpg?text=image2',
      alt: '배너이미지2',
    },
    {
      src: 'https://via.placeholder.com/430x200.jpg?text=image3',
      alt: '배너이미지3',
    },
  ]);
  const totalSlides: number = bannerImages.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 3000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <SSlider>
      <SSlides
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {bannerImages.map((image) => (
          <SImage key={image.alt} src={image.src} alt={image.alt} />
        ))}
      </SSlides>
      <SIndicators>
        {bannerImages.map((image, index) => (
          <SIndicator
            key={image.alt}
            isActive={index === currentIndex}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </SIndicators>
      <SPagination>
        {currentIndex + 1} / {totalSlides}
      </SPagination>
    </SSlider>
  );
}

const SSlider = styled.ol`
  position: relative;
  overflow: hidden;
  width: 100%;
`;

const SSlides = styled.li`
  display: flex;
  transition: transform 0.5s ease;
`;

const SImage = styled.img`
  height: 200px;
  flex-shrink: 0;
`;

const SIndicators = styled.div`
  position: absolute;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
`;

const SIndicator = styled.button<{ isActive: boolean }>`
  display: inline-block;
  width: 6px;
  height: 6px;
  margin: 0 2px;
  background-color: ${({ isActive }) =>
    isActive ? 'rgba(0, 0, 0, .5)' : 'rgba(0, 0, 0, .3)'};
  border-radius: 50%;
  transition: background-color 0.3s;
`;

const SPagination = styled.span`
  position: absolute;
  top: 16px;
  right: 16px;
  height: 18px;
  line-height: 18px;
  padding: 0 6px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 9px;
  color: ${({ theme }) => theme.color.white};
  font-size: 0.75rem;
  text-align: center;
`;
