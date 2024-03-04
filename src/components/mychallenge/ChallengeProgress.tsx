import styled from '@emotion/styled';

export default function ChallengeProgress() {
  return (
    <SWrapper>
      <SProgressWrapper>
        <SProgressBar>
          <SDealt dealt={80} />
        </SProgressBar>
      </SProgressWrapper>
      <SCountList>
        <li>
          <SResult>인증 성공</SResult>
          <SCount>1회</SCount>
        </li>
        <li>
          <SResult>인증 실패</SResult>
          <SCount>1회</SCount>
        </li>
        <li>
          <SResult>남은 인증</SResult>
          <SCount>1회</SCount>
        </li>
      </SCountList>
    </SWrapper>
  );
}

const SWrapper = styled.div``;

const SProgressWrapper = styled.div`
  padding-bottom: 1rem;
`;

const SProgressBar = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.gray_ec};
`;

const SDealt = styled.div<{ dealt: number }>`
  width: ${({ dealt }) => dealt + '%'};
  height: 100%;
  border-radius: 8px;
  background-color: ${({ dealt, theme }) =>
    dealt >= 80 ? theme.color.middle : theme.color.gray_52};
  z-index: 1;

  &::after {
  }
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
  margin-bottom: 8px;
`;

const SCount = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.color.gray_3c};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
`;
