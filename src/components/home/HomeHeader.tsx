import styled from '@emotion/styled';
import Image from 'next/image';
import Head from 'next/head';
import { SHeaderWrapper } from '@/components/common/Header';

export default function HomeHeader() {
  return (
    <>
      <Head>
        <title>WAVED</title>
        <meta
          name="description"
          content="개발 직군 취준생들을 위한 챌린지 서비스, WAVED입니다."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SHeader>
        <SLogo>
          <h1 className="a11yHidden">WAVED</h1>
          <Image
            alt="WAVED 로고"
            src="https://via.placeholder.com/100x30.jpg"
            width={100}
            height={30}
          />
        </SLogo>
        <SAlarm type="button" />
      </SHeader>
    </>
  );
}

const SHeader = styled(SHeaderWrapper)`
  justify-content: space-between;
  padding: 0 1.25rem;
`;

const SLogo = styled.div`
  height: 30px;
  line-height: 0;
`;

const SAlarm = styled.button`
  display: inline-block;
  width: 24px;
  height: 24px;
  background: url('/icons/icon-alarm-active.svg') no-repeat center;
`;
