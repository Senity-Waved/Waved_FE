import styled from '@emotion/styled';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
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
            src="/icons/icon-waved-logo.svg"
            width={96}
            height={36}
            quality={100}
          />
        </SLogo>
        <SAlarm href="/notification" aria-label="알림 내역">
          <Image
            alt="알림"
            src="/icons/icon-notification.svg"
            width={24}
            height={24}
            style={{ verticalAlign: 'top' }}
            priority
          />
        </SAlarm>
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

const SAlarm = styled(Link)`
  display: inline-block;
  width: 24px;
  height: 24px;
`;
