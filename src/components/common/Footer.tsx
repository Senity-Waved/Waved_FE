import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  homeNormal,
  homeFilled,
  myChallengeNormal,
  myChallengeFilled,
  profileNormal,
  profileFilled,
} from '../../../public/icons';

export default function Footer() {
  const router = useRouter();

  return (
    <SFooterWrapper>
      <SFooterNavLink href="/">
        <SFooterNavItem isActive={router.pathname === '/'}>
          <Image
            src={router.pathname === '/' ? homeFilled : homeNormal}
            alt="홈 아이콘"
            width={24}
            height={24}
            blurDataURL="/icons/icon-home-normal"
          />
          <p>홈</p>
        </SFooterNavItem>
      </SFooterNavLink>
      <SFooterNavLink href="/mychallenge">
        <SFooterNavItem isActive={router.pathname === '/mychallenge'}>
          <Image
            src={
              router.pathname === '/mychallenge'
                ? myChallengeFilled
                : myChallengeNormal
            }
            alt="마이 챌린지 아이콘"
            width={24}
            height={24}
            blurDataURL="/icons/icon-mychallenge-normal"
          />
          <p>마이 챌린지</p>
        </SFooterNavItem>
      </SFooterNavLink>
      <SFooterNavLink href="/profile">
        <SFooterNavItem isActive={router.pathname === '/profile'}>
          <Image
            src={router.pathname === '/profile' ? profileFilled : profileNormal}
            alt="프로필 아이콘"
            width={24}
            height={24}
            blurDataURL="/icons/icon-profile-normal"
          />
          <p>프로필</p>
        </SFooterNavItem>
      </SFooterNavLink>
    </SFooterWrapper>
  );
}

const SFooterWrapper = styled.nav`
  z-index: 10;
  flex-shrink: 0;
  width: 100%;
  height: 91px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  gap: 3.5rem;
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  border-top: 1px solid #dee1e5;
  padding: 0.625rem 1.25rem 2.375rem 1.25rem;
`;

const SFooterNavLink = styled(Link)`
  width: 74px;
  height: 43px;
`;

const SFooterNavItem = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-between;
  color: ${({ isActive, theme }) => !isActive && theme.color.gray_83};
  font-size: ${({ theme }) => theme.fontSize.caption1};
  font-weight: ${({ theme }) => theme.fontWeight.caption1};
`;
