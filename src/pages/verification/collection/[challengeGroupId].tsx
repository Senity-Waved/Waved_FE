import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { RecoilEnv, useRecoilValue } from 'recoil';
import ISnackBarState from '@/types/snackbar';
import ONE_DAY from '@/constants/day';
import Layout from '@/components/common/Layout';
import Stamp from '@/components/verification/collection/Stamp';
import VerificationList from '@/components/verification/collection/VerificationList';
import SnackBar from '@/components/common/SnackBar';
import parseDate from '@/utils/parseDate';
import ISelectedMyChallenge from '@/types/selectedMyChallenge';
import ASelectedMyChallenge from '@/atoms/selectedMyChallenge';
import IVerificationInfo from '@/types/verification';
import {
  getMyStampApi,
  getVerificationsApi,
} from '@/lib/axios/verification/collection/api';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export default function VeirificationCollection() {
  const router = useRouter();
  const { query } = useRouter();
  const challengeGroupId = router.query.challengeGroupId as string;
  const [snackBarState, setSnackBarState] = useState<ISnackBarState>({
    open: false,
    text: '',
  });

  const recoilMyChallengeData =
    useRecoilValue<ISelectedMyChallenge>(ASelectedMyChallenge);
  const [challengeData, setChallengeData] = useState<ISelectedMyChallenge>({
    challengeGroupId: 0,
    myChallengeId: 0,
    groupTitle: '',
    startDate: '',
    endDate: '',
    verificationType: 'TEXT',
    status: 'PROGRESS',
  });

  const [stampData, setStampData] = useState<number[]>([]);
  const [verificationsData, setVerificationsData] = useState<
    IVerificationInfo[]
  >([]);
  const [isEmptyData, setIsEmptyData] = useState<boolean>(false);

  const today = new Date().getTime();
  const [date, setDate] = useState<number>(today);
  const [year, month, day] = parseDate(date);
  const isToday = parseDate(today).join('-') === `${year}-${month}-${day}`;
  const isStartday =
    `${year}-${month}-${day}` === challengeData.startDate.split('T')[0];
  const isEndday =
    `${year}-${month}-${day}` === challengeData.endDate.split('T')[0];
  const getNextDay = () => setDate(date + ONE_DAY);
  const getPreviousDay = () => setDate(date - ONE_DAY);

  // 날짜 기본 값 세팅
  useEffect(() => {
    const endDateTime = new Date(challengeData.endDate).getTime();
    if (endDateTime < date) setDate(endDateTime);
  }, [challengeData.endDate, date]);

  // 리코일에서 마이챌린지 정보 가져오기
  useEffect(() => {
    setChallengeData(recoilMyChallengeData);
    if (challengeData.myChallengeId) {
      getMyStampApi(challengeData.myChallengeId)
        .then((data) => {
          setStampData(data.myVerifs);
        })
        .catch((error) => {
          console.error(`getMyStampApi API 실패`, error);
        });
    }
    if (challengeGroupId && date) {
      getVerificationsApi(challengeGroupId, `${year}-${month}-${day}`)
        .then((data) => {
          setVerificationsData(data);
        })
        .catch((error) => {
          if (
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            error.response.data === '해당 날짜에 존재하는 인증내역이 없습니다.'
          ) {
            setIsEmptyData(true);
          }
          console.error(`getVerificationsApi API 실패`, error);
        });
    }
  }, [
    recoilMyChallengeData,
    challengeData.myChallengeId,
    challengeGroupId,
    year,
    month,
    day,
    date,
  ]);

  console.log(verificationsData);
  // 스낵바
  useEffect(() => {
    const handleRouting = (
      snackBarText: string,
      snackBarType: 'correct' | 'warning' = 'correct',
    ): void => {
      setSnackBarState({
        open: true,
        text: snackBarText,
        type: snackBarType,
      });
      router
        .replace(
          {
            pathname: `/verification/collection/${challengeGroupId}`,
          },
          undefined,
          {
            shallow: true,
          },
        )
        .catch((error: Error) =>
          console.error('쿼리스트링 제거 후 페이지 이동 실패', error),
        );
      setTimeout(() => {
        setSnackBarState({
          open: false,
          text: '',
        });
      }, 3500);
    };
    if (query.submitVerification) {
      handleRouting('인증 제출이 완료되었습니다.');
    }
  }, [query, router, challengeGroupId]);

  return (
    <Layout
      headerText={challengeData.groupTitle}
      title={`인증내역-${challengeData.groupTitle}`}
      description="챌린지의 인증내역을 확인하는 페이지입니다."
      noFooter
    >
      <SStampWrapper>
        <STitle>📌 내 인증 현황 </STitle>
        <Stamp results={stampData} startDate={challengeData.startDate} />
      </SStampWrapper>
      {challengeData.verificationType !== 'GITHUB' && (
        <>
          <SDateWrapper>
            <SDateBtn
              direction="prev"
              onClick={getPreviousDay}
              disabled={isStartday}
            />
            <SDate>
              {year}. {month}. {day}
            </SDate>
            <SDateBtn
              direction="next"
              onClick={getNextDay}
              disabled={isToday || isEndday}
            />
          </SDateWrapper>
          <VerificationList
            verificationType={challengeData.verificationType}
            challengeGroupId={challengeGroupId}
            verifications={verificationsData}
            date={`${year}-${month}-${day}`}
            isToday={isToday}
            isEmptyData={isEmptyData}
          />
        </>
      )}
      {snackBarState.open && (
        <SnackBar
          text={snackBarState.text}
          type={snackBarState.type}
          noFooter
        />
      )}
    </Layout>
  );
}

const SStampWrapper = styled.section`
  padding: 1rem 1.25rem 0 1.25rem;
`;

const STitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.headline2};
  line-height: 1.4;
  font-weight: ${({ theme }) => theme.fontWeight.headline2};
  color: ${({ theme }) => theme.color.gray_3c};
`;

const SDateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.25rem;
`;

const SDate = styled.span`
  font-size: ${({ theme }) => theme.fontSize.body2};
  font-weight: ${({ theme }) => theme.fontWeight.body2};
  color: ${({ theme }) => theme.color.gray_3c};
`;

const SDateBtn = styled.button<{ direction: 'prev' | 'next' }>`
  width: 24px;
  height: 24px;
  background: url(/icons/icon-left-arrow.svg) no-repeat center;
  transform: rotate(
    ${({ direction }) => (direction === 'prev' ? '0deg' : '180deg')}
  );

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
