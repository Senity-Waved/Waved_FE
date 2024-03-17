import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import ISelectedChallenge from '@/types/selectedChallenge';

interface IChallengeSummary
  extends Pick<
    ISelectedChallenge,
    'groupTitle' | 'startDate' | 'endDate' | 'condition' | 'participantCount'
  > {
  setSummaryHeight?: (height: number) => void;
  className?: string;
}
export default function ChallengeSummary({
  className,
  groupTitle,
  participantCount,
  startDate,
  endDate,
  condition,
  setSummaryHeight,
}: IChallengeSummary) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const updateHeight = () => {
      if (ref.current && setSummaryHeight) {
        setSummaryHeight(ref.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [setSummaryHeight]);
  return (
    <SChallengeSummary className={className} ref={ref}>
      <STitle>{groupTitle}</STitle>
      <SStatus condition={condition}>
        {condition === 'closed' && '종료'}
        {condition === 'recruiting' && '모집중'}
        {condition === 'processing' && '진행중'}
      </SStatus>
      <SDate>
        {startDate} ~ {endDate}
      </SDate>
      <SParticipant>{participantCount}명</SParticipant>
    </SChallengeSummary>
  );
}

const SChallengeSummary = styled.div`
  position: sticky;
  top: 3.5rem;
  background-color: ${({ theme }) => theme.color.white};
  z-index: 5;
  display: grid;
  grid-template-columns: 1fr 80px;
  grid-template-rows: 1fr 20px;
  align-items: center;
  gap: 0.25rem;
  padding: 1rem 1.25rem;
  color: ${({ theme }) => theme.color.gray_3c};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray_ec};
  &.description {
    border-bottom: 6px solid ${({ theme }) => theme.color.gray_ec};
  }
`;

const STitle = styled.h2`
  min-height: 28px;
  line-height: 28px;
  font-size: ${({ theme }) => theme.fontSize.headline2};
  font-weight: ${({ theme }) => theme.fontWeight.headline2};
`;

const SStatus = styled.span<Pick<ISelectedChallenge, 'condition'>>`
  justify-self: end;
  height: 20px;
  line-height: 20px;
  padding: 0 8px;
  border: 1px solid
    ${({ condition, theme }) =>
      ({
        closed: theme.color.error,
        recruiting: theme.color.normal,
        processing: theme.color.positive,
      })[condition]};
  border-radius: 10px;
  color: ${({ condition, theme }) =>
    ({
      closed: theme.color.error,
      recruiting: theme.color.normal,
      processing: theme.color.positive,
    })[condition]};
  font-size: ${({ theme }) => theme.fontSize.caption2};
  font-weight: ${({ theme }) => theme.fontWeight.caption2};
`;

const SDate = styled.p`
  line-height: 20px;
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
`;

const SParticipant = styled.span`
  justify-self: end;
  background: url('/icons/icon-participant-black.svg') no-repeat 0;
  padding: 0 0.375rem 0 1.5rem;
  font-size: ${({ theme }) => theme.fontSize.caption1};
  font-weight: ${({ theme }) => theme.fontWeight.caption1};
`;
