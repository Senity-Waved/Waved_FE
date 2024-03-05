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
  margin: 60px 20px 38px 20px;
  margin-top: 0;
  line-height: 0;

  .slick-slide div {
    outline: none;
  }

  .slick-dots li {
    width: 4px;
    height: 4px;
  }

  .slick-dots li button::before {
    color: ${({ theme }) => theme.color.gray_de};
    opacity: 100;
    line-height: 1.4;
    height: 4px;
    margin-top: 4px;
  }

  .slick-dots .slick-active button::before {
    color: ${({ theme }) => theme.color.gray_3c};
  }
`;
