import styled from '@emotion/styled';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Btn from '@/components/common/Btn';
import PreviewSlider from '@/components/onboarding/PreviewSlider';
import { SLayoutWrapper } from '@/components/common/Layout';

export default function OnBoarding() {
  return (
    <SOnBoardingWrapper>
      <Head>
        <title>WAVED</title>
        <meta name="description" content="WAVED의 온보딩 페이지입니다." />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="a11yHidden">WAVED</h1>
      <main>
        <PreviewSlider>
          <SPreviewImage>
            <Image
              src="/images/image-waved-preview1.svg"
              alt="개발자들과 함께 챌린지를 시작해요. 개발자 직군만 모여있는 유일한 챌린지 서비스. WAVED에서 챌린지를 시작해 보세요!"
              width={390}
              height={518}
              priority
            />
          </SPreviewImage>
          <SPreviewImage>
            <Image
              src="/images/image-waved-preview2.svg"
              alt="목표에 돈을 걸어서 목표를 달성해보세요. 목표를 세우고 잘 못 지키는 일이 있었나요? WAVED와 함께라면 달성할 수 있어요!"
              width={390}
              height={518}
              priority
            />
          </SPreviewImage>
          <SPreviewImage>
            <Image
              src="/images/image-waved-preview3.svg"
              alt="인증을 100% 달성하면 전액 환급을 받을 수 있어요. 결심을 달성하기 위해 WAVED와 함께 도전해보세요!"
              width={390}
              height={518}
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
              {
                text: '구글로 계속하기',
                styleType: 'white_line',
                size: 'large',
              },
            ]}
          />
        </SLoginBtnWrapper>
        <SNonMemberLink href="/">먼저 둘러볼게요</SNonMemberLink>
        <SServiceRegisterText>
          계정 생성 시 WAVED의&nbsp;
          <SServicePolicyLink href="/">
            개인정보 처리방침 및 이용약관
          </SServicePolicyLink>
          에 동의하게 됩니다.
        </SServiceRegisterText>
      </main>
    </SOnBoardingWrapper>
  );
}

const SOnBoardingWrapper = styled(SLayoutWrapper)`
  & form {
    color: ${({ theme }) => theme.color.gray_3c};
    font-weight: ${({ theme }) => theme.fontWeight.body2};
  }

  & main {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
  }
`;

const SPreviewImage = styled.div`
  height: 455px;
  position: relative;
  top: 30%;
  left: 50%;
  transform: translate(-50%, 0);
  & img {
    position: absolute;
    height: auto;
    width: 100%;
  }
`;

const SLoginBtnWrapper = styled.div`
  height: 48px;
  position: relative;
  margin: 1.5rem 1.25rem 1.5rem 1.25rem;
`;

const SGoogleLogo = styled.div`
  position: absolute;
  transform: translateY(-50%);
  height: 24px;
  top: 50%;
  left: 5%;
`;

const SNonMemberLink = styled(Link)`
  width: 89px;
  height: 18px;
  line-height: 1.4;
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.color.gray_99};
  margin: 0 auto 1.625rem auto;
`;

const SServiceRegisterText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.caption3};
  font-weight: ${({ theme }) => theme.fontWeight.caption3};
  color: ${({ theme }) => theme.color.gray_99};
  height: 14px;
  width: 100%;
  line-height: 1.4;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 0.75rem;
`;

const SServicePolicyLink = styled(Link)`
  border-bottom: 1px solid;
`;