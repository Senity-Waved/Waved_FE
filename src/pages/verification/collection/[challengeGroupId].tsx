import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import ISnackBarState from '@/types/snackbar';
import ONE_DAY from '@/constants/day';
import Layout from '@/components/common/Layout';
import Stamp from '@/components/verification/collection/Stamp';
import VerificationList from '@/components/verification/collection/VerificationList';
import SnackBar from '@/components/common/SnackBar';
import parseDate from '@/utils/parseDate';
import { getCollectionInfoApi } from '@/lib/axios/verification/collection/api';
import { ICollectionInfo } from '@/types/verification';
import useSnackBar from '@/hooks/useSnackBar';

export default function VeirificationCollection() {
  const router = useRouter();
  const { query } = useRouter();
  const challengeGroupId = router.query.challengeGroupId as string;
  const verificationType = router.query.type as string;
  const myChallengeId = router.query.myChallengeId as string;
  const [snackBarState, setSnackBarState] = useState<ISnackBarState>({
    open: false,
    text: '',
  });

  const [stampData, setStampData] = useState<number[]>([]);
  const [challengeData, setChallengeData] = useState<ICollectionInfo>({
    groupTitle: '',
    startDate: '',
    endDate: '',
  });

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

  // 인증내역 페이지 정보 GET
  useEffect(() => {
    if (myChallengeId) {
      getCollectionInfoApi(myChallengeId)
        .then((data) => {
          setStampData(data.myVerifs);
          setChallengeData({
            groupTitle: data.groupTitle,
            startDate: data.startDate,
            endDate: data.endDate,
          });
        })
        .catch((error) => {
          const err = error as AxiosError;
          if (
            err.response &&
            err.response.data === '해당 마이 챌린지를 찾을 수 없습니다.'
          ) {
            router
              .push(`/404`)
              .catch((er) => console.error('404페이지로 이동 실패', er));
          }
        });
    }
  }, [myChallengeId, router]);

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
            query: {
              type: verificationType,
              myChallengeId,
            },
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
  }, [query, router, challengeGroupId, myChallengeId, verificationType]);

  const { snackBarData } = useSnackBar();
  useEffect(() => {
    setSnackBarState(snackBarData);
  }, [snackBarData]);

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
      {verificationType !== 'GITHUB' && (
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
            verificationType={verificationType}
            challengeGroupId={challengeGroupId}
            date={`${year}-${month}-${day}`}
            isToday={isToday}
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
