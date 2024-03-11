import styled from '@emotion/styled';

type TCondition = 'closed' | 'recruiting' | 'processing';

interface IChallengeSummary {
  title: string;
  participantCount: number;
  startDate: string;
  endDate: string;
  condition: TCondition;
}

export default function ChallengeSummary({
  title,
  participantCount,
  startDate,
  endDate,
  condition,
}: IChallengeSummary) {
  return (
    <SChallengeSummary>
      <STitle>{title}</STitle>
      <SStatus condition={condition}>
        {condition === 'closed' && '마감'}
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
  top: 0;
  background-color: ${({ theme }) => theme.color.white};
  z-index: 5;
  display: grid;
  grid-template-columns: 1fr 80px;
  grid-template-rows: 1fr 20px;
  align-items: center;
  gap: 6px;
  padding: 1.25rem;
  color: ${({ theme }) => theme.color.gray_3c};
  &::after {
    position: absolute;
    bottom: 0;
    display: block;
    width: 100%;
    height: 6px;
    background-color: ${({ theme }) => theme.color.gray_ec};
    content: '';
  }
`;

const STitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.headline2};
  font-weight: ${({ theme }) => theme.fontWeight.headline2};
`;

const SStatus = styled.span<{
  condition: TCondition;
}>`
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
