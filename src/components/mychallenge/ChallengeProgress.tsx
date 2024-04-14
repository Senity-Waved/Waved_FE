import styled from '@emotion/styled';
import { TMyChallengeInfo } from '@/types/myChallenge';
import calculateDDay from '@/utils/calculateDDay';

export default function ChallengeProgress({
  successCount,
  startDate,
  endDate,
  isVerified,
}: Pick<
  TMyChallengeInfo,
  'successCount' | 'startDate' | 'endDate' | 'isVerified'
>) {
  const daysDiff = Math.abs(calculateDDay(startDate, endDate)) + 1;
  const failCount =
    Math.abs(calculateDDay(startDate)) - successCount + (isVerified ? 1 : 0);
  const dealt = (() => {
    const percent = (100 / daysDiff) * successCount;
    return Math.round(percent);
  })();

  return (
    <SWrapper>
      <SProgressWrapper>
        <SProgerssNum>
          <p>
            <span className="a11yHidden">인증 달성률</span>
            {dealt}%
          </p>
          <p>100%</p>
        </SProgerssNum>
        <SProgressBar dealt={dealt}>
          <SDealt dealt={dealt} />
        </SProgressBar>
      </SProgressWrapper>
      <SCountList>
        <li>
          <SResult>인증 성공</SResult>
          <SCount>{successCount}회</SCount>
        </li>
        <li>
          <SResult>인증 실패</SResult>
          <SCount>{failCount}회</SCount>
        </li>
        <li>
          <SResult>남은 인증</SResult>
          <SCount>{daysDiff - failCount - successCount}회</SCount>
        </li>
      </SCountList>
    </SWrapper>
  );
}

const SWrapper = styled.div`
  margin-bottom: 1rem;
`;

const SProgressWrapper = styled.div`
  padding-bottom: 1rem;
`;

const SProgerssNum = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  line-height: 1.4;
  color: ${({ theme }) => theme.color.gray_3c};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  margin-bottom: 0.5rem;
`;

const SProgressBar = styled.div<{ dealt: number }>`
  width: 100%;
  height: 10px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.gray_ec};
  position: relative;

  &::before {
    content: '';
    display: block;
    height: 100%;
    width: 14px;
    height: 18px;
    background-image: ${({ dealt }) =>
      dealt >= 70
        ? 'url(/icons/icon-pointer-blue.svg)'
        : 'url(/icons/icon-pointer-gray.svg)'};
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    top: 0;
    right: 30%;
    transform: translate(50%, -100%);
  }
`;

const SDealt = styled.div<{ dealt: number }>`
  width: ${({ dealt }) => `${dealt}%`};
  height: 100%;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.normal};
  z-index: 1;
`;

const SCountList = styled.ul`
  display: flex;
  justify-content: space-between;
  line-height: 1.4;

  li {
    width: 76px;
  }
`;

const SResult = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.color.gray_70};
  font-weight: ${({ theme }) => theme.fontWeight.caption2};
  margin-bottom: 0.5rem;
`;

const SCount = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.color.gray_3c};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
`;
