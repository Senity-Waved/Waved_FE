import styled from '@emotion/styled';
import Link from 'next/link';
import screenSize from '@/constants/screenSize';

interface IFloatingBtn {
  type: 'challengeRequest' | 'register';
}

export default function FloatingBtn({ type }: IFloatingBtn) {
  const renderButtonContent = () => {
    if (type === 'challengeRequest') {
      return (
        <SFloatingBtnWrapper>
          <SChallengeRequest href="/challenge/request">
            챌린지 요청
          </SChallengeRequest>
        </SFloatingBtnWrapper>
      );
    }
    if (type === 'register') {
      return (
        <SFloatingBtnWrapper>
          <SRegister href="/">회원가입 및 로그인</SRegister>
        </SFloatingBtnWrapper>
      );
    }
    return null;
  };
  return renderButtonContent();
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

const SChallengeRequest = styled(SFloatingBtn)`
  margin: 0 1.25rem 0 auto;
  padding: 0.625rem 1.25rem;
  &::before {
    content: '';
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url('/icons/icon-write-form.svg') no-repeat center;
  }
`;

const SRegister = styled(SFloatingBtn)`
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
`;
