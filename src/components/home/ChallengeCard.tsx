import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import IRecruitingChallenge from '@/types/recruitingChallenge';
import VERIFICATION_TYPE from '@/constants/verificationType';
import screenSize from '@/constants/screenSize';
import calculateDDay from '@/utils/calculateDDay';

export default function ChallengeCard({
  challengeGroupId,
  groupTitle,
  // thumbnail,
  verificationType,
  participantCount,
  startDate,
  isFree,
}: IRecruitingChallenge) {
  const caculateRecruitDDay = (date: string) => {
    const dDay = calculateDDay(date) - 1;
    let dDayStr;
    if (dDay < 0) {
      dDayStr = '모집 마감';
    } else {
      dDayStr = `모집 마감일 D-${dDay === 0 ? 'DAY' : dDay}`;
    }
    return dDayStr;
  };

  return (
    <SChallengeCard>
      <Link href={`/challenge/${challengeGroupId}`}>
        <SThumbnail>
          <Image
            alt={`${groupTitle} 대표 이미지`}
            src="https://via.placeholder.com/700x800.jpg"
            fill
            sizes={`${screenSize.max}px`}
            style={{ objectFit: 'cover' }}
            priority
          />
          <SParticipant>{participantCount}</SParticipant>
          <SRecruitDDay>{caculateRecruitDDay(startDate)}</SRecruitDDay>
        </SThumbnail>
        <STitle>{groupTitle}</STitle>
        <SChips>
          <dt className="a11yHidden">챌린지 인증 빈도</dt>
          <dd>매일</dd>
          <dt className="a11yHidden">챌린지 진행 기한</dt>
          <dd>2주</dd>
          <dt className="a11yHidden">챌린지 인증 방식</dt>
          <dd>{VERIFICATION_TYPE[verificationType]}</dd>
          {isFree && (
            <>
              <dt className="a11yHidden">챌린지 예치금 유무</dt>
              <dd>무료</dd>
            </>
          )}
        </SChips>
      </Link>
    </SChallengeCard>
  );
}

const SChallengeCard = styled.li`
  margin-bottom: 2rem;
`;

const SThumbnail = styled.div`
  position: relative;
  width: 100%;
  height: 167px;
  line-height: 0;
  border-radius: 8px;
  overflow: hidden;
`;

const SParticipant = styled.span`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  height: 20px;
  padding: 0 0.5rem;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  color: ${({ theme }) => theme.color.gray_f9};
  font-size: ${({ theme }) => theme.fontSize.caption1};
  font-weight: ${({ theme }) => theme.fontWeight.caption1};
  line-height: 20px;
  z-index: 1;
  &::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 10px;
    background: url('/icons/icon-participant-white.svg') no-repeat center;
  }
`;

const SRecruitDDay = styled.span`
  position: absolute;
  bottom: 0.5rem;
  right: 0.75rem;
  color: ${({ theme }) => theme.color.gray_f9};
  font-size: ${({ theme }) => theme.fontSize.caption1};
  font-weight: ${({ theme }) => theme.fontWeight.caption1};
  line-height: 16px;
  z-index: 1;
`;

const STitle = styled.div`
  padding: 0 0.25rem;
  margin: 0.375rem 0;
  line-height: 22px;
  color: ${({ theme }) => theme.color.gray_3c};
  font-size: ${({ theme }) => theme.fontSize.body2};
  font-weight: ${({ theme }) => theme.fontWeight.body2};
`;

const SChips = styled.dl`
  display: flex;
  gap: 0.25rem;
  padding: 0 0.25rem;
  dd {
    display: inline-block;
    height: 20px;
    padding: 0 0.5rem;
    background-color: ${({ theme }) => theme.color.light};
    border-radius: 10px;
    line-height: 20px;
    color: ${({ theme }) => theme.color.gray_3c};
    font-size: ${({ theme }) => theme.fontSize.caption2};
    font-weight: ${({ theme }) => theme.fontWeight.caption2};
  }
`;
