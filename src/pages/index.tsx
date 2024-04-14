import styled from '@emotion/styled';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Btn from '@/components/common/Btn';
import PreviewSlider from '@/components/onboarding/PreviewSlider';
import { SLayoutWrapper } from '@/components/common/Layout';
import SnackBar from '@/components/common/SnackBar';
import ISnackBarState from '@/types/snackbar';

export default function OnBoarding() {
  const { query } = useRouter();
  const router = useRouter();
  const [snackBarState, setSnackBarState] = useState<ISnackBarState>({
    open: false,
    text: '',
    type: 'correct',
  });

  useEffect(() => {
    const handleRouting = (
      snackBarText: string,
      snackBarType: 'correct' | 'warning' = 'correct',
    ): void => {
      setSnackBarState({ open: true, text: snackBarText, type: snackBarType });
      router.replace('/', undefined, { shallow: true }).catch(console.error);
    };

    if (query.logout) {
      handleRouting('로그아웃이 완료되었습니다.');
    } else if (query.withdrawal) {
      handleRouting('계정을 탈퇴하셨습니다.');
    } else if (query.needLoginToParticipant) {
      handleRouting('로그인 후 신청 가능합니다.', 'warning');
    } else if (query.forcedLogout) {
      handleRouting('중복 로그인으로 강제 로그아웃되었습니다.', 'warning');
    }
  }, [query, router]);

  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_LOGIN_URL}`;
  };

  return (
    <SOnBoardingWrapper>
      <Head>
        <title>WAVED</title>
        <meta name="description" content="WAVED의 온보딩 페이지입니다." />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </Head>
      <h1 className="a11yHidden">WAVED</h1>
      <main>
        <PreviewSlider>
          <SPreviewImage>
            <Image
              src="/images/image-waved-preview1.png"
              alt="개발자들과 함께 챌린지를 시작해요. 개발자 직군만 모여있는 유일한 챌린지 서비스. WAVED에서 챌린지를 시작해 보세요!"
              width={390}
              height={518}
              priority
            />
          </SPreviewImage>
          <SPreviewImage>
            <Image
              src="/images/image-waved-preview2.png"
              alt="챌린지에 예치금을 걸어 목표를 달성해보세요. WAVED와 함께라면 달성할 수 있어요!"
              width={390}
              height={518}
              priority
            />
          </SPreviewImage>
          <SPreviewImage>
            <Image
              src="/images/image-waved-preview3.png"
              alt="인증 80% 이상 달성 시 전액 환급을 받을 수 있어요. 결심을 달성하기 위해 WAVED와 함께 도전해보세요!"
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
                onClick: handleLogin,
              },
            ]}
          />
        </SLoginBtnWrapper>
        <SNonMemberLink href="/home">먼저 둘러볼게요</SNonMemberLink>
        <SServiceRegisterText>
          계정 생성 시 WAVED의&nbsp;
          <SServicePolicyLink
            href="https://waved-likelion.notion.site/10970657567d47128df672d68aa4d16a"
            target="_blank"
            rel="noreferrer noopener"
          >
            개인정보 처리방침
          </SServicePolicyLink>
          &nbsp;및 &nbsp;
          <SServicePolicyLink
            href="https://waved-likelion.notion.site/0c37aaa907014e1fbbe3d62cf9a7690e"
            target="_blank"
            rel="noreferrer noopener"
          >
            이용약관
          </SServicePolicyLink>
          에 동의하게 됩니다.
        </SServiceRegisterText>
        {snackBarState.open && (
          <SnackBar
            text={snackBarState.text}
            type={snackBarState.type}
            noFooter
          />
        )}
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
    margin: 0;
  }
`;

const SPreviewImage = styled.div`
  height: 462px;
  position: relative;
  top: 30%;
  left: 48%;
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
  color: ${({ theme }) => theme.color.gray_3c};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray_3c};
  margin: 0 auto 1.5rem auto;
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
  margin-bottom: 0.25rem;
`;

const SServicePolicyLink = styled(Link)`
  border-bottom: 1px solid;
`;
