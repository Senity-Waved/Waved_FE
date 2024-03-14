import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { SLayoutWrapper } from '@/components/common/Layout';
import Btn from '@/components/common/Btn';

export default function RegisterSuccess() {
  const router = useRouter();
  const goToHome = () => {
    router.push('/').catch((error) => {
      console.error('페이지 이동에 실패하였습니다.', error);
    });
  };

  return (
    <SRegisterSuccessWrapper>
      <Head>
        <title>WAVED | 회원가입</title>
        <meta name="description" content="회원가입 완료" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="a11yHidden">WAVED</h1>
      <main>
        <SRegisterSuccessBox>
          <div>
            <Image
              src="/images/image-fanfare.svg"
              alt="팡파레 이미지"
              width={88}
              height={88}
              priority
            />
            <SSuccessText>회원가입 완료</SSuccessText>
            <p>함께 챌린지를 시작해볼까요?</p>
          </div>
        </SRegisterSuccessBox>
        <SRegisterSuccessBtnWrapper onClick={goToHome}>
          <Btn
            btns={[
              {
                text: '시작하기',
                styleType: 'primary',
                size: 'large',
              },
            ]}
          />
        </SRegisterSuccessBtnWrapper>
      </main>
    </SRegisterSuccessWrapper>
  );
}

const SRegisterSuccessWrapper = styled(SLayoutWrapper)`
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
  font-size: ${({ theme }) => theme.fontSize.body2};
  font-weight: ${({ theme }) => theme.fontWeight.body2};
  color: ${({ theme }) => theme.color.gray_83};
`;

const SSuccessText = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.subtitle1};
  font-weight: ${({ theme }) => theme.fontWeight.subtitle1};
  color: ${({ theme }) => theme.color.gray_3c};
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

const SRegisterSuccessBtnWrapper = styled.div`
  width: calc(100% - 40px);
  margin: 0 1.25rem 50px 1.25rem;
`;
