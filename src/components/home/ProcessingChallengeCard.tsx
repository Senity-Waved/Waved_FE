import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import IMyProcessingChallenge from '@/types/myProcessingChallenge';
import calculateDDay from '@/utils/calculateDDay';
import getChallengeImagePath from '@/utils/getChallengeImagePath';

export default function ProcessingChallengeCard({
  challengeGroupId,
  groupTitle,
  startDate,
}: IMyProcessingChallenge) {
  const thumbnail = getChallengeImagePath({
    title: groupTitle,
  }) as string;
  const caculateProcessDay = (date: string) => {
    const dDay = Math.abs(calculateDDay(date)) + 1;
    const dDayStr = `${dDay}일차`;
    return dDayStr;
  };

  return (
    <SChallengeCard>
      <Link href={`/challenge/${challengeGroupId}`}>
        <SThumbnail>
          <Image
            alt={`${groupTitle} 대표 이미지`}
            src={thumbnail}
            width={260}
            height={126}
            style={{ objectFit: 'cover' }}
          />
          <SProcessingDay>{caculateProcessDay(startDate)}</SProcessingDay>
        </SThumbnail>
        <STitle>{groupTitle}</STitle>
      </Link>
    </SChallengeCard>
  );
}

const SChallengeCard = styled.li`
  display: inline-block;
  width: 260px;
  &:last-child {
    margin-right: 1.25rem;
  }
  &:not(:last-child) {
    margin-right: 0.75rem;
  }
`;

const SThumbnail = styled.div`
  position: relative;
  width: 100%;
  line-height: 0;
  border-radius: 8px;
  overflow: hidden;
`;

const SProcessingDay = styled.span`
  position: absolute;
  bottom: 0.5rem;
  right: 0.75rem;
  color: ${({ theme }) => theme.color.white};
  font-size: ${({ theme }) => theme.fontSize.caption1};
  font-weight: ${({ theme }) => theme.fontWeight.caption1};
  line-height: 16px;
  z-index: 1;
`;

const STitle = styled.h3`
  padding: 0 0.25rem;
  margin-top: 0.5rem;
  line-height: 22px;
  color: ${({ theme }) => theme.color.gray_3c};
  font-size: ${({ theme }) => theme.fontSize.body2};
  font-weight: ${({ theme }) => theme.fontWeight.body2};
`;
