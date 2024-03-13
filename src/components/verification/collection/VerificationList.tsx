import styled from '@emotion/styled';
import VerificationItem, { IVerificationInfo } from './VerificationItem';
import { useState } from 'react';
import VerificationPhotoItem from './VerificationPhotoItem';

interface IVerificationList {
  verifications: IVerificationInfo[];
  isToday: boolean;
  question?: string;
}

export default function VerificationList({
  verifications,
  question,
  isToday,
}: IVerificationList) {
  const myId = 1;
  const [sort, setSort] = useState<'time' | 'likeCount'>('likeCount');
  const [selectedId, setSelectedId] = useState<number>(0);
  const [myVerification] = verifications.filter(
    (verification) => verification.authorId === myId,
  );

  const type = 'photo';

  return (
    <SWrapper>
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
        {myVerification ? (
          <VerificationItem
            {...myVerification}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        ) : (
          isToday && (
            <SEmptyMyVerifiaction>
              오늘의 인증을 진행해주세요!
            </SEmptyMyVerifiaction>
          )
        )}
        <VerificationPhotoItem />
        <VerificationPhotoItem />
        <VerificationPhotoItem />
        <VerificationPhotoItem />
        <VerificationPhotoItem />
        <VerificationPhotoItem />
        <VerificationPhotoItem />
        <VerificationPhotoItem />
        {/* {verifications
          .filter((verification) => verification.authorId !== myId)
          .map((verification) => {
            const { verificationId } = verification;
            return (
              <VerificationItem
                key={verificationId}
                {...verification}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
              />
            );
          })
          .sort((veri1, veri2) => veri2.props[sort] - veri1.props[sort])} */}
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
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
`;

const SEmptyMyVerifiaction = styled.p`
  color: ${({ theme }) => theme.color.gray_99};
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  margin-bottom: 1rem;
  text-align: center;
`;
