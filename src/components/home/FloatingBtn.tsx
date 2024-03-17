import styled from '@emotion/styled';
import Link from 'next/link';

interface IFloatingBtn {
  type: 'challengeRequest' | 'register';
}

export default function FloatingBtn({ type }: IFloatingBtn) {
  const renderButtonContent = () => {
    if (type === 'challengeRequest') {
      return <SChallengeRequest href="/request">챌린지 요청</SChallengeRequest>;
    }
    if (type === 'register') {
      return <SRegister href="/register">회원가입 및 로그인</SRegister>;
    }
    return null;
  };
  return renderButtonContent();
}

const SFloatingBtn = styled(Link)`
  position: absolute;
  bottom: 112px;
  z-index: 10;
  display: flex;
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
  right: 20px;
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
  left: 50%;
  transform: translateX(-50%);
  padding: 0.75rem 1.5rem;
`;
