import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { IVerificationInfo } from '@/types/verification';
import VerificationItem from './VerificationItem';
import VerificationPhotoItem from './VerificationPhotoItem';
import {
  getMyVerifiactionApi,
  getQuizApi,
  getVerificationsApi,
} from '@/lib/axios/verification/collection/api';
import EmptyView from '@/components/common/EmptyView';

interface IVerificationList {
  verificationType: string;
  challengeGroupId: string;
  isToday: boolean;
  date: string;
}

export default function VerificationList({
  verificationType,
  challengeGroupId,
  isToday,
  date,
}: IVerificationList) {
  const [verificationsData, setVerificationsData] = useState<
    IVerificationInfo[]
  >([]);
  const [myVerificationData, setMyVerificationData] = useState<
    IVerificationInfo[]
  >([]);
  const [isEmptyData, setIsEmptyData] = useState<boolean>(false);

  const [sort, setSort] = useState<'time' | 'likeCount'>('likeCount');
  const [selectedId, setSelectedId] = useState<number>(0);
  const [sortedVerifications, setSortedVerifications] = useState<
    IVerificationInfo[]
  >([]);
  const [question, setQuestion] = useState<string>('');

  const [myVerification] = myVerificationData;
  const allVerification = useMemo(() => {
    let myId = 0;
    if (myVerification) myId = myVerification.memberId;
    return verificationsData.filter(
      (verification) => verification.memberId !== myId,
    );
  }, [verificationsData, myVerification]);

  const getVerificationList = useCallback(async () => {
    // 내 인증내역 GET
    try {
      const myVeriData = await getMyVerifiactionApi(challengeGroupId, date);
      setMyVerificationData(myVeriData);
    } catch (MyVeriError) {
      setMyVerificationData([]);
      console.error('날짜별 내 인증내역 불러오기 실패');
    }
    // 전체 인증내역 GET
    try {
      const veriData = await getVerificationsApi(challengeGroupId, date);
      setVerificationsData(veriData);
      setIsEmptyData(false);
    } catch (veriError) {
      setVerificationsData([]);
      setIsEmptyData(true);
      console.error('날짜별 인증내역 불러오기 실패');
    }
  }, [challengeGroupId, date]);

  useEffect(() => {
    if (challengeGroupId !== undefined && verificationType !== 'GITHUB') {
      getVerificationList().catch((err) => console.error(err));
    }
  }, [getVerificationList, challengeGroupId, verificationType, sort]);

  // 인증내역 정렬
  useEffect(() => {
    if (allVerification.length) {
      const sorted = [...allVerification].sort((veri1, veri2) => {
        if (sort === 'time') {
          const time1 = new Date(veri1.verificationDate);
          const time2 = new Date(veri2.verificationDate);
          return time2.getTime() - time1.getTime();
        }
        // sort === likeCount
        return veri2.likesCount - veri1.likesCount;
      });
      setSortedVerifications(sorted);
    } else {
      setSortedVerifications([]);
    }
  }, [sort, allVerification]);

  // 기술면접 문제 get
  useEffect(() => {
    if (verificationType === 'TEXT' && challengeGroupId)
      getQuizApi(challengeGroupId, date)
        .then((data) => {
          setQuestion(data.question);
        })
        .catch((error) => {
          console.error('getQuiz API 실패', error);
          setQuestion('문제를 불러오는데 실패했습니다.');
        });
  }, [verificationType, challengeGroupId, date]);

  return (
    <SWrapper>
      {question && <SQuestion>Q. {question}</SQuestion>}
      <SSortBtnWrapper>
        <SSortBtn isActive={sort === 'time'} onClick={() => setSort('time')}>
          • 최신순
        </SSortBtn>
        <SSortBtn
          isActive={sort === 'likeCount'}
          onClick={() => setSort('likeCount')}
        >
          • 추천순
        </SSortBtn>
      </SSortBtnWrapper>
      <SList>
        {
          // eslint-disable-next-line no-nested-ternary
          myVerification ? (
            verificationType === 'PICTURE' ? (
              <VerificationPhotoItem {...myVerification} isMine />
            ) : (
              <VerificationItem
                {...myVerification}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                isMine
              />
            )
          ) : (
            isToday && (
              <SEmptyMyVerifiaction>
                오늘의 인증을 진행해주세요!
              </SEmptyMyVerifiaction>
            )
          )
        }
        {sortedVerifications.map((verification) => {
          const { verificationId } = verification;
          return verificationType === 'PICTURE' ? (
            <VerificationPhotoItem
              key={verificationId}
              {...verification}
              isMine={false}
            />
          ) : (
            <VerificationItem
              key={verificationId}
              {...verification}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              isMine={false}
            />
          );
        })}
        {isEmptyData && <EmptyView pageType="인증내역" />}
      </SList>
    </SWrapper>
  );
}

const SWrapper = styled.div`
  padding: 1rem 1.25rem;
`;

const SSortBtnWrapper = styled.div`
  overflow: hidden;
  margin-bottom: 1rem;
`;

const SSortBtn = styled.button<{ isActive: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  color: ${({ theme, isActive }) =>
    isActive ? theme.color.gray_3c : theme.color.gray_83};
  margin-left: 0.5rem;
  float: right;
`;

const SList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  position: relative;
`;

const SQuestion = styled.p`
  color: ${({ theme }) => theme.color.normal};
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  line-height: 1.6;
  padding: 1rem;
  background-color: ${({ theme }) => theme.color.light};
  border-radius: 12px;
  margin-bottom: 1.5rem;
`;

const SEmptyMyVerifiaction = styled.p`
  color: ${({ theme }) => theme.color.gray_99};
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  width: 100%;
  margin-bottom: 1rem;
  text-align: center;
`;
