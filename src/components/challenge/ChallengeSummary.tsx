import styled from '@emotion/styled';

interface IChallengeSummary {
  condition: 'closed' | 'recruiting' | 'processing';
}

export default function ChallengeSummary({ condition }: IChallengeSummary) {
  return (
    <SInfoCard>
      <STitle>기술 면접 챌린지 1기</STitle>
      <SStatus condition={condition}>
        {condition === 'closed' && '마감'}
        {condition === 'recruiting' && '모집중'}
        {condition === 'processing' && '진행중'}
      </SStatus>
      <SDate>03월 04일 (월) ~ 03월 15일 (금)</SDate>
      <SParticipant>23명</SParticipant>
    </SInfoCard>
  );
}

const SInfoCard = styled.div`
  position: sticky;
  top: 0;
  display: grid;
  grid-template-columns: 1fr 80px;
  grid-template-rows: 1fr 20px;
  align-items: center;
  gap: 6px;
  padding: 1.25rem;
  background-color: ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.gray_3c};
  z-index: 5;
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

const SStatus = styled.span<IChallengeSummary>`
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
