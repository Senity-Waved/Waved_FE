import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from '@emotion/styled';

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
  margin-bottom: 24px;
  outline: none;
  & img {
    margin: 0 auto;
  }

  .slick-dots {
    height: 30px;
  }

  .slick-dots li {
    width: 4px;
    height: 4px;
  }

  .slick-dots li button::before {
    color: ${({ theme }) => theme.color.gray_de};
    opacity: 100;
  }

  .slick-dots .slick-active button::before {
    color: ${({ theme }) => theme.color.gray_3c};
  }
`;
