import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import media from '@/styles/media';
import screenSize from '@/constants/screenSize';
import Btn from '@/components/common/Btn';
import PreviewSlider from '@/components/onboarding/PreviewSlider';

export default function OnBoarding() {
  return (
    <SOnBoardingWrapper>
      <PreviewSlider>
        <SPreviewImage>
          <Image
            src="/images/image-waved-preview1.svg"
            alt="Waved 서비스 미리보기 이미지"
            width={335}
            height={462}
            priority
          />
        </SPreviewImage>
        <SPreviewImage>
          <Image
            src="/images/image-waved-preview2.svg"
            alt="Waved 서비스 미리보기 이미지"
            width={335}
            height={462}
            priority
          />
        </SPreviewImage>
        <SPreviewImage>
          <Image
            src="/images/image-waved-preview3.svg"
            alt="Waved 서비스 미리보기 이미지3"
            width={335}
            height={462}
            priority
          />
        </SPreviewImage>
      </PreviewSlider>
      <SLoginBtnWrapper>
        <SGoogleLogo>
          <Image
            src="/icons/icon-google-logo.svg"
            alt="구글 로고"
            width={24}
            height={24}
          />
        </SGoogleLogo>
        <Btn
          btns={[
            { text: '구글로 계속하기', styleType: 'white_line', size: 'large' },
          ]}
        />
      </SLoginBtnWrapper>
      <Link href="/">
        <SNonMemberLink>먼저 둘러볼게요</SNonMemberLink>
      </Link>
    </SOnBoardingWrapper>
  );
}

const SOnBoardingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${screenSize.max}px;
  height: 100vh;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
  }
  ${media.mobileMax} {
    width: 100vw;
  }

  & form {
    color: ${({ theme }) => theme.color.gray_3c};
    font-weight: ${({ theme }) => theme.fontWeight.body2};
  }
`;

const SPreviewImage = styled.div`
  width: 335px;
  margin: 3.75rem auto 0 auto;
`;

const SLoginBtnWrapper = styled.div`
  height: 48px;
  position: relative;
  margin: 1.5rem 1.25rem 2.25rem 1.25rem;
`;

const SGoogleLogo = styled.div`
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  left: 5%;
  z-index: 15;
`;

const SNonMemberLink = styled.p`
  width: 89px;
  height: 18px;
  line-height: 1.4;
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.color.gray_99};
  margin: 0 auto;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray_99};
  margin-bottom: 15px;
`;
