import styled from '@emotion/styled';
import Link from 'next/link';

export default function ChallengeRequest() {
  return <SChallengeRequest href="/request">챌린지 요청</SChallengeRequest>;
}

const SChallengeRequest = styled(Link)`
  position: fixed;
  right: 20px;
  bottom: 112px;
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background-color: ${({ theme }) => theme.color.normal};
  border-radius: 24px;
  box-shadow: 0px 2px 5px 2px rgba(82, 85, 92, 0.25);
  color: ${({ theme }) => theme.color.gray_ec};
  font-size: ${({ theme }) => theme.fontSize.subtitle1};
  font-weight: ${({ theme }) => theme.fontWeight.subtitle1};
  &::before {
    content: '';
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url('/icons/icon-write-form.svg') no-repeat center;
  }
`;
