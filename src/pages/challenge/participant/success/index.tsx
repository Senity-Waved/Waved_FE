import styled from '@emotion/styled';
import Image from 'next/image';
import Head from 'next/head';
import { SLayoutWrapper } from '@/components/common/Layout';
import Btn from '@/components/common/Btn';
import ChallengeSummary from '@/components/challenge/ChallengeSummary';

export default function ParticipantSuccess() {
  const challengeData = {
    title: '기술면접 챌린지 1기',
    participantCount: 23,
    startDate: '03월 04일 (월)',
    endDate: '03월 15일 (금)',
    isFree: true,
  };
  return (
    <SParticipantSuccessWrapper>
      <Head>
        <title>WAVED | 챌린지 신청</title>
        <meta name="description" content="챌린지 신청 완료" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="a11yHidden">WAVED</h1>
      <main>
        <div>
          <SParticipantSuccessGuideWrapper>
            <Image
              src="/icons/icon-done.svg"
              width={88}
              height={88}
              priority
              alt="확인 완료 아이콘"
            />
            <SGuideTextWrapper>
              <p>신청완료</p>
              <p>WAVED와 함께 훌륭한 개발자로 도약하세요!</p>
            </SGuideTextWrapper>
          </SParticipantSuccessGuideWrapper>
          <SParticipantSuccessInfoWrapper>
            <ChallengeSummary
              title={challengeData.title}
              participantCount={challengeData.participantCount}
              startDate={challengeData.startDate}
              endDate={challengeData.endDate}
              condition="recruiting"
            />
            <SPayDepositWrapper>
              <p>예치금</p>
              <p>5,000원</p>
            </SPayDepositWrapper>
          </SParticipantSuccessInfoWrapper>
        </div>
        <SParticipantSuccessBtnWrapper>
          <Btn
            btns={[
              {
                text: '확인',
                styleType: 'primary',
                size: 'large',
              },
            ]}
          />
        </SParticipantSuccessBtnWrapper>
      </main>
    </SParticipantSuccessWrapper>
  );
}

const SParticipantSuccessWrapper = styled(SLayoutWrapper)`
  & main {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;

    & + div {
      flex: 1;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
    }
  }
`;

const SParticipantSuccessGuideWrapper = styled.section`
  height: 370px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  border-bottom: 6px solid ${({ theme }) => theme.color.gray_ec};
`;

const SGuideTextWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 52px;
  margin-top: 1rem;

  & p:first-of-type {
    font-size: ${({ theme }) => theme.fontSize.subtitle1};
    font-weight: ${({ theme }) => theme.fontWeight.subtitl1};
  }

  & p:last-of-type {
    font-size: ${({ theme }) => theme.fontSize.body2};
    font-weight: ${({ theme }) => theme.fontWeight.body2};
    color: ${({ theme }) => theme.color.gray_83};
  }
`;

const SParticipantSuccessInfoWrapper = styled.div`
  height: 144px;
`;

const SPayDepositWrapper = styled.div`
  height: 74px;
  line-height: 74px;
  margin: 0 24px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  & p:first-of-type {
    font-size: ${({ theme }) => theme.fontSize.subtitle1};
    font-weight: ${({ theme }) => theme.fontWeight.subtitle1};
    color: ${({ theme }) => theme.color.gray_3c};
  }

  & p:last-of-type {
    font-size: ${({ theme }) => theme.fontSize.body2};
    font-weight: ${({ theme }) => theme.fontWeight.body2};
    color: ${({ theme }) => theme.color.gray_83};
  }
`;

const SParticipantSuccessBtnWrapper = styled.div`
  width: calc(100% - 40px);
  margin: 0 1.25rem 50px 1.25rem;
`;
