import { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import IVerificationInfo, { TVerificationType } from '@/types/verification';
import VerificationItem from './VerificationItem';
import VerificationPhotoItem from './VerificationPhotoItem';
import { getQuizApi } from '@/lib/axios/verification/post/api';
import EmptyView from '@/components/common/EmptyView';

interface IVerificationList {
  verificationType: TVerificationType;
  verifications: IVerificationInfo[];
  challengeGroupId: string;
  isToday: boolean;
  date: string;
  isEmptyData: boolean;
}

export default function VerificationList({
  verificationType,
  verifications,
  challengeGroupId,
  isToday,
  date,
  isEmptyData,
}: IVerificationList) {
  const myId = 1;
  const [sort, setSort] = useState<'time' | 'likeCount'>('likeCount');
  const [selectedId, setSelectedId] = useState<number>(0);
  const [sortedVerifications, setSortedVerifications] = useState<
    IVerificationInfo[]
  >([]);
  const [question, setQuestion] = useState<string>('');

  const [myVerification] = verifications.filter(
    (verification) => verification.memberId === myId,
  );
  const allVerification = useMemo(() => {
    return verifications.filter(
      (verification) => verification.memberId !== myId,
    );
  }, [verifications, myId]);

  // 인증내역 정렬
  useEffect(() => {
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
  }, [sort, allVerification]);

  // 기술면접 문제 get
  // useEffect(() => {
  //   if (verificationType === 'TEXT' && challengeGroupId !== undefined)
  //     getQuizApi(challengeGroupId)
  //       .then((data) => {
  //         setQuestion(data.question);
  //       })
  //       .catch((error) => {
  //         console.error('getQuiz API 실패', error);
  //         setQuestion('문제를 불러오는데 실패했습니다.');
  //       });
  // }, [verificationType, challengeGroupId]);

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
              <VerificationPhotoItem {...myVerification} />
            ) : (
              <VerificationItem
                {...myVerification}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
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
            <VerificationPhotoItem key={verificationId} {...verification} />
          ) : (
            <VerificationItem
              key={verificationId}
              {...verification}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
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
