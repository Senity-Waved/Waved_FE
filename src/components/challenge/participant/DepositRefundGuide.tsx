import styled from '@emotion/styled';

export default function DepositRefundGuide() {
  return (
    <SDepositRefundGuideWrapper>
      <SDepositRefundGuideTitle>예치금 환급 안내</SDepositRefundGuideTitle>
      <SDepositRefundGuide>
        <SDepositRefundGuideItem>
          <p>80% 이상 성공</p>
          <p>예치금 전액 환불</p>
        </SDepositRefundGuideItem>
        <SDepositRefundGuideItem>
          <p>80% 미만 성공</p>
          <p>예치금 환불 불가</p>
        </SDepositRefundGuideItem>
      </SDepositRefundGuide>
    </SDepositRefundGuideWrapper>
  );
}

const SDepositRefundGuideWrapper = styled.section`
  padding: 1.5rem 1.25rem;
  border-bottom: 6px solid ${({ theme }) => theme.color.gray_ec};
`;

const SDepositRefundGuideTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.subtitle1};
  font-weight: ${({ theme }) => theme.fontWeight.subtitle1};
`;

const SDepositRefundGuide = styled.div`
  margin-top: 1.125rem;
  display: flex;
  flex-flow: column nowrap;
  gap: 12px;
`;

const SDepositRefundGuideItem = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSize.body2};
  font-weight: ${({ theme }) => theme.fontWeight.body2};

  & p:last-of-type {
    color: ${({ theme }) => theme.color.gray_83};
  }
`;
