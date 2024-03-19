import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import IMyProcessingChallenge from '@/types/myProcessingChallenge';
import calculateDDay from '@/utils/calculateDDay';

export default function ChallengeCardWide({
  groupId,
  groupTitle,
  startDate,
  thumbnail,
}: IMyProcessingChallenge) {
  const caculateProcessDay = (date: string) => {
    const dDay = Math.abs(calculateDDay(date)) + 2;
    const dDayStr = `${dDay}일차`;
    return dDayStr;
  };

  return (
    <SChallengeCardWide>
      <Link href={`/challenge/${groupId}`}>
        <SThumbnail>
          <Image
            alt={`${groupTitle} 대표 이미지`}
            src={thumbnail}
            width={260}
            height={126}
            style={{ objectFit: 'cover' }}
            priority
          />
          <SProcessingDay>{caculateProcessDay(startDate)}</SProcessingDay>
        </SThumbnail>
        <STitle>{groupTitle}</STitle>
      </Link>
    </SChallengeCardWide>
  );
}

const SChallengeCardWide = styled.li`
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
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 70%,
      rgba(0, 0, 0, 0.9) 100%
    );
  }
`;

const SProcessingDay = styled.span`
  position: absolute;
  bottom: 0.5rem;
  right: 0.75rem;
  color: ${({ theme }) => theme.color.gray_f9};
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
