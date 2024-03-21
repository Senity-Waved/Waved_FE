import styled from '@emotion/styled';
import { TMyChallengeInfo } from '@/types/myChallenge';

export default function ChallengeLabel({
  isSuccessed,
  isRefunded,
}: Pick<TMyChallengeInfo, 'isSuccessed' | 'isRefunded'>) {
  const labelStatus = (() => {
    if (isSuccessed) {
      return isRefunded ? '환급 완료' : '달성 완료';
    }
    return '달성 실패';
  })();
  return <SLabel labelStatus={labelStatus}>{labelStatus}</SLabel>;
}

const SLabel = styled.span<{
  labelStatus: '달성 완료' | '달성 실패' | '환급 완료';
}>`
  display: block;
  width: fit-content;
  padding: 0.25rem 0.5rem;
  font-size: ${({ theme }) => theme.fontSize.caption2};
  font-weight: ${({ theme }) => theme.fontWeight.caption2};
  color: ${({ labelStatus, theme }) =>
    ({
      '달성 완료': theme.color.positive,
      '달성 실패': theme.color.error,
      '환급 완료': theme.color.gray_83,
    })[labelStatus]};
  background-color: ${({ labelStatus, theme }) =>
    ({
      '달성 완료': '#E9F7EB',
      '달성 실패': '#FCE7E8',
      '환급 완료': theme.color.gray_ec,
    })[labelStatus]};
  margin-bottom: 0.625rem;
  border-radius: 16px;
`;
