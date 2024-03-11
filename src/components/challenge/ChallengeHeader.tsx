import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { SBackBtn, SHeaderWrapper } from '@/components/common/Header';
import ShareBtn from '@/components/challenge/ShareBtn';

export default function ChallengeHeader() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>WAVED | 챌린지 상세 정보</title>
        <meta name="description" content="챌린지 상세 정보입니다.." />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SHeaderWrapper>
        <SBackBtn
          type="button"
          onClick={() => router.back()}
          aria-label="뒤로 가기"
        >
          <Image
            src="/icons/icon-left-arrow.svg"
            alt="뒤로가기 아이콘"
            width={24}
            height={24}
            priority
          />
        </SBackBtn>
        <ShareBtn />
      </SHeaderWrapper>
    </>
  );
}
