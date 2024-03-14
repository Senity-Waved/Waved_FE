import { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import IVerificationInfo from '@/types/verification';
import VerificationItem from './VerificationItem';
import VerificationPhotoItem from './VerificationPhotoItem';

interface IVerificationList {
  verificationType: string;
  verifications: IVerificationInfo[];
  isToday: boolean;
  question?: string;
}

export default function VerificationList({
  verificationType,
  verifications,
  question,
  isToday,
}: IVerificationList) {
  const myId = 1;
  const [sort, setSort] = useState<'time' | 'likeCount'>('likeCount');
  const [selectedId, setSelectedId] = useState<number>(0);
  const [sortedVerifications, setSortedVerifications] = useState<
    IVerificationInfo[]
  >([]);

  const [myVerification] = verifications.filter(
    (verification) => verification.authorId === myId,
  );
  const allVerification = verifications.filter(
    (verification) => verification.authorId !== myId,
  );
  const sortVerifications = useCallback(() => {
    const sorted = allVerification.sort((veri1, veri2) => {
      if (sort === 'time') {
        const time1 = new Date(veri1.time);
        const time2 = new Date(veri2.time);
        return time2.getTime() - time1.getTime();
      }
      // sort === likeCount
      return veri2.likeCount - veri1.likeCount;
    });
    setSortedVerifications(sorted);
  }, [sort, allVerification]);

  useEffect(() => {
    sortVerifications();
  }, [sortVerifications]);

  return (
    <SWrapper>
      <SSortBtnWrapper>
        {question && <SQuestion>Q. {question}</SQuestion>}
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
        {myVerification ? (
          verificationType === 'photo' ? (
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
        )}
        {sortedVerifications.map((verification) => {
          const { verificationId } = verification;
          return verificationType === 'photo' ? (
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
      </SList>
    </SWrapper>
  );
}

const SWrapper = styled.div`
  padding: 0.5rem 1.25rem;
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
`;

const SQuestion = styled.p`
  color: ${({ theme }) => theme.color.gray_3c};
  font-size: ${({ theme }) => theme.fontSize.body1};
  font-weight: ${({ theme }) => theme.fontWeight.body1};
  padding: 1rem 0.25rem 1.5rem 0.25rem;
`;

const SEmptyMyVerifiaction = styled.p`
  color: ${({ theme }) => theme.color.gray_99};
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  margin-bottom: 1rem;
  text-align: center;
`;
