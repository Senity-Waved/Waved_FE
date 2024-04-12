import styled from '@emotion/styled';
import Link from 'next/link';
import screenSize from '@/constants/screenSize';

export default function FloatingBtn() {
  return (
    <SFloatingBtnWrapper>
      <SRegister href="/">회원가입 및 로그인</SRegister>
    </SFloatingBtnWrapper>
  );
}

const SFloatingBtnWrapper = styled.div`
  position: fixed;
  bottom: 112px;
  z-index: 10;
  display: flex;
  width: 100%;
  max-width: ${screenSize.max}px;
`;

const SFloatingBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${({ theme }) => theme.color.normal};
  border-radius: 24px;
  box-shadow: 0px 2px 5px 2px rgba(82, 85, 92, 0.25);
  color: ${({ theme }) => theme.color.gray_ec};
  font-size: ${({ theme }) => theme.fontSize.body1};
  font-weight: ${({ theme }) => theme.fontWeight.body1};
  line-height: 24px;
`;

const SRegister = styled(SFloatingBtn)`
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
`;
