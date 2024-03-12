import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { SLayoutWrapper } from '@/components/common/Layout';
import Btn from '@/components/common/Btn';

export default function ChallengeRequestSuccess() {
  const router = useRouter();
  const goToHome = () => {
    router.push('/').catch((error) => {
      console.error('페이지 이동에 실패하였습니다.', error);
    });
  };

  return (
    <SChallengeRequestSuccessWrapper>
      <Head>
        <title>WAVED | 챌린지 요청</title>
        <meta name="description" content="챌린지 요청 완료" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="a11yHidden">WAVED</h1>
      <main>
        <SChallengeRequestSuccessBox>
          <div>
            <Image
              src="/icons/icon-done.svg"
              alt="요청 완료 아이콘"
              width={88}
              height={88}
              priority
            />
            <SChallengeRequestSuccessText>
              요청 완료
            </SChallengeRequestSuccessText>
            <p>
              감사합니다. 요청하신 챌린지는 <br /> 검토 후 적극 반영하겠습니다.
            </p>
          </div>
        </SChallengeRequestSuccessBox>
        <SChallengeRequestSuccessBtnWrapper onClick={goToHome}>
          <Btn
            btns={[
              {
                text: '확인',
                styleType: 'primary',
                size: 'large',
              },
            ]}
          />
        </SChallengeRequestSuccessBtnWrapper>
      </main>
    </SChallengeRequestSuccessWrapper>
  );
}

const SChallengeRequestSuccessWrapper = styled(SLayoutWrapper)`
  & main {
    display: flex;
    justify-content: space-between;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const SChallengeRequestSuccessBox = styled.div`
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

const SChallengeRequestSuccessText = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.subtitle1};
  font-weight: ${({ theme }) => theme.fontWeight.subtitle1};
  color: ${({ theme }) => theme.color.gray_3c};
  margin-top: 1rem;
  margin-bottom: 0.25rem;
`;

const SChallengeRequestSuccessBtnWrapper = styled.div`
  width: calc(100% - 40px);
  margin: 0 1.25rem 50px 1.25rem;
`;
