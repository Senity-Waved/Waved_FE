import Head from 'next/head';
import { SHeaderCenter, SHeaderWrapper } from '@/components/common/Header';

export default function MychallengeHeader() {
  return (
    <>
      <Head>
        <title>WAVED | 마이챌린지</title>
        <meta
          name="description"
          content="신청한 챌린지와 진행 현황을 확인할 수 있는 마이챌린지 페이지입니다."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </Head>
      <SHeaderWrapper>
        <SHeaderCenter>마이챌린지</SHeaderCenter>
      </SHeaderWrapper>
    </>
  );
}
