import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface IPreviewSlider {
  children: React.ReactNode;
}

export default function PreviewSlider({ children }: IPreviewSlider) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
  };
  return <SSliderWrapper {...settings}>{children}</SSliderWrapper>;
}

const SSliderWrapper = styled(Slider)`
  outline: none;
  margin: 0 1.25rem 2.375rem 1.25rem;
  line-height: 0;

  .slick-slide div {
    outline: none;
  }

  .slick-dots li {
    width: 2px;
    height: 2px;
    margin: 0 0.5rem;
  }

  .slick-dots li button {
    width: 0;
    height: 0;
    padding: 0;
  }

  .slick-dots li button::before {
    color: ${({ theme }) => theme.color.gray_de};
    opacity: 100;
    line-height: 1.4;
    width: 4px;
    height: 2px;
  }

  .slick-dots .slick-active button::before {
    color: ${({ theme }) => theme.color.gray_3c};
  }
`;
