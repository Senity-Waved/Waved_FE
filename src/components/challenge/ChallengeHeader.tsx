import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import styled from '@emotion/styled';
import { SBackBtn, SHeaderWrapper } from '@/components/common/Header';
import ISnackBarState from '@/types/snackbar';

export default function ChallengeHeader({
  setSnackBarState,
}: {
  setSnackBarState: (state: ISnackBarState) => void;
}) {
  const router = useRouter();
  const copyUrl = () => {
    const currentUrl = window.location.href.split('#')[0];
    navigator.clipboard.writeText(currentUrl).then(
      () => {
        console.log('URL 복사 성공');
        setSnackBarState({
          open: true,
          text: '링크가 복사되었습니다.',
        });
        setTimeout(() => {
          setSnackBarState({
            open: false,
            text: '',
          });
        }, 3500);
      },
      (error) => {
        console.error('URL 복사 실패', error);
      },
    );
  };
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
        <SShareBtn
          type="button"
          onClick={copyUrl}
          aria-label="현재 페이지 URL 복사하기"
        />
      </SHeaderWrapper>
    </>
  );
}

const SShareBtn = styled.button`
  position: absolute;
  right: 0;
  margin-right: 1.25rem;
  display: inline-block;
  width: 24px;
  height: 24px;
  background: url('/icons/icon-share.svg') no-repeat center;
`;
