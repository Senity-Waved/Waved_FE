import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';
import { SLayoutWrapper } from '@/components/common/Layout';
import BottomFixedBtn from '@/components/common/BottomFixedBtn';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function RegisterSuccess() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const goToHome = () => {
    setIsLoaded(true);
    router.push('/home').catch((error) => {
      console.error('페이지 이동에 실패하였습니다.', error);
    });
  };

  return (
    <SRegisterSuccessWrapper noHeader noFooter withBottomFixedBtn>
      <Head>
        <title>WAVED | 회원가입</title>
        <meta name="description" content="회원가입 완료" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </Head>
      <h1 className="a11yHidden">WAVED</h1>
      <main>
        {isLoaded ? (
          <LoadingSpinner />
        ) : (
          <>
            {' '}
            <SRegisterSuccessBox>
              <div>
                <Image
                  src="/images/image-register-success.svg"
                  alt="회원가입 성공 이미지"
                  width={247}
                  height={247}
                  priority
                />
                <SSuccessText>회원가입 완료</SSuccessText>
                <p>함께 챌린지를 시작해볼까요?</p>
              </div>
            </SRegisterSuccessBox>
            <BottomFixedBtn
              btns={[
                {
                  text: '시작하기',
                  styleType: 'primary',
                  size: 'large',
                  onClick: goToHome,
                },
              ]}
            />
          </>
        )}
      </main>
    </SRegisterSuccessWrapper>
  );
}

const SRegisterSuccessWrapper = styled(SLayoutWrapper)`
  display: flex;
  & main {
    display: flex;
    justify-content: space-between;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const SRegisterSuccessBox = styled.div`
  height: 153px;
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  color: ${({ theme }) => theme.color.gray_83};
`;

const SSuccessText = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.headline2};
  font-weight: ${({ theme }) => theme.fontWeight.headline2};
  color: ${({ theme }) => theme.color.gray_3c};
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;
