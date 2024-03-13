import styled from '@emotion/styled';

export default function DepositGuide() {
  return (
    <SDepositGuideWrapper>
      <SDepositGuideTitle>예치금 추가</SDepositGuideTitle>
      <SDepositGuide>
        챌린지 목표를 달성하고, 예치금을 반환 받으세요!
      </SDepositGuide>
    </SDepositGuideWrapper>
  );
}

const SDepositGuideWrapper = styled.section`
  height: 112px;
  margin: 0 1.5rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
`;

const SDepositGuideTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.subtitle1};
  font-weight: ${({ theme }) => theme.fontWeight.subtitle1};
`;

const SDepositGuide = styled.p`
  margin-top: 1rem;
  font-size: ${({ theme }) => theme.fontSize.body2};
  font-weight: ${({ theme }) => theme.fontWeight.body2};
`;
