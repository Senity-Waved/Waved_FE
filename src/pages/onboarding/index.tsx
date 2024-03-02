import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import media from '@/styles/media';
import screenSize from '@/constants/screenSize';
import BottomFixedBtn from '@/components/common/BottomFixedBtn';

export default function OnBoarding() {
  return (
    <SOnBoardingWrapper>
      <SPreviewImage>
        <Image
          src="/images/image-waved-preview1.svg"
          alt="Waved 서비스 미리보기 이미지"
          width={335}
          height={462}
          priority
        />
      </SPreviewImage>
      <SLoginBtnWrapper>
        <SGoogleLogo>
          <Image
            src="/icons/icon-google-logo.svg"
            alt="구글 로고"
            width={24}
            height={24}
          />
        </SGoogleLogo>
        <BottomFixedBtn
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
`;

const SPreviewImage = styled.div`
  width: 335px;
  height: 496px;
  margin: 60px auto 0 auto;
  padding-bottom: 24px;
`;

const SLoginBtnWrapper = styled.div`
  height: 48px;
  position: relative;
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  margin-top: 24px;
  margin-bottom: 36px;
`;
const SGoogleLogo = styled.div`
  position: absolute;
  transform: translateY(-50%);
  top: 15%;
  left: 10%;
  z-index: 15;
`;

const SNonMemberLink = styled.p`
  width: 89px;
  height: 22px;
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.color.gray_83};
  margin: 0 auto;
  text-decoration: underline;
`;
