import styled from '@emotion/styled';
import Image from 'next/image';
import Head from 'next/head';
import { SLayoutWrapper } from '@/components/common/Layout';

export default function Custom500() {
  return (
    <SCustom500Wrapper noHeader noFooter>
      <Head>
        <title>WAVED | 500 에러</title>
        <meta name="description" content="서버에 문제가 발생했습니다." />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="a11yHidden">WAVED</h1>
      <main>
        <SCustom500>
          <Image
            src="/icons/icon-500-error.svg"
            alt="500 에러"
            width={170}
            height={76}
            priority
          />
          <SMainText>서버에 문제가 발생했습니다.</SMainText>
          <SSubText>
            서비스 이용에 불편을 드려 죄송합니다.
            <br />
            잠시 후 다시 접속해주세요.
          </SSubText>
        </SCustom500>
      </main>
    </SCustom500Wrapper>
  );
}

const SCustom500Wrapper = styled(SLayoutWrapper)`
  display: flex;
`;

const SCustom500 = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: auto 0;
`;

const SMainText = styled.h3`
  margin: 2.5rem 0 0.5rem;
  color: ${({ theme }) => theme.color.gray_3c};
  font-size: ${({ theme }) => theme.fontSize.headline2};
  font-weight: ${({ theme }) => theme.fontWeight.headlineh2};
`;

const SSubText = styled.p`
  color: ${({ theme }) => theme.color.gray_52};
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  text-align: center;
`;
