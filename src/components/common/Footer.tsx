/* eslint-disable no-nested-ternary */
import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  homeNormal,
  homeFilled,
  myChallengeNormal,
  myChallengeFilled,
  myChallengeDisabled,
  profileNormal,
  profileFilled,
} from '../../../public/icons';
import screenSize from '@/constants/screenSize';

interface IFooterProps {
  isLogined: boolean;
}

export default function Footer({ isLogined }: IFooterProps) {
  const router = useRouter();
  // const cookieToken = getCookie('accessToken');
  // const isLogined = !!cookieToken;

  const navigate = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    path: string,
  ) => {
    e.preventDefault();

    if (!isLogined && path === '/mychallenge') {
      return;
    }

    if (router.pathname !== path) {
      router.push(path).catch((error) => console.error('이동 실패', error));
    }
  };

  return (
    <SFooterWrapper>
      <SFooterNavLink onClick={(e) => navigate(e, '/home')}>
        <SFooterNavItem isActive={router.pathname === '/home'}>
          <Image
            src={router.pathname === '/home' ? homeFilled : homeNormal}
            alt="홈 아이콘"
            width={24}
            height={24}
            blurDataURL="/icons/icon-home-normal"
          />
          <p>홈</p>
        </SFooterNavItem>
      </SFooterNavLink>
      <SFooterNavLink onClick={(e) => navigate(e, '/mychallenge')}>
        <SMyChallengeNavItem
          isActive={router.pathname === '/mychallenge'}
          isLogined={isLogined}
        >
          <Image
            src={
              isLogined
                ? router.pathname === '/mychallenge'
                  ? myChallengeFilled
                  : myChallengeNormal
                : myChallengeDisabled
            }
            alt="마이 챌린지 아이콘"
            width={24}
            height={24}
            blurDataURL="/icons/icon-mychallenge-normal"
          />
          <p>마이챌린지</p>
        </SMyChallengeNavItem>
      </SFooterNavLink>
      <SFooterNavLink onClick={(e) => navigate(e, '/profile')}>
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
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  gap: 3.5rem;
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: ${screenSize.max}px;
  height: 91px;
  padding: 0.625rem 1.25rem 2.375rem 1.25rem;
  background-color: ${({ theme }) => theme.color.white};
  border-top: 1px solid #dee1e5;
`;

const SFooterNavLink = styled.button`
  width: 74px;
  height: 43px;
`;

const SFooterNavItem = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-between;
  color: ${({ isActive, theme }) =>
    !isActive ? theme.color.gray_83 : theme.color.gray_3c};
  font-size: ${({ theme }) => theme.fontSize.caption1};
  font-weight: ${({ theme }) => theme.fontWeight.caption1};
`;

const SMyChallengeNavItem = styled.div<{
  isActive: boolean;
  isLogined: boolean;
}>`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-between;
  cursor: ${({ isLogined }) => (isLogined ? 'pointer' : 'not-allowed')};
  color: ${({ isActive, isLogined, theme }) =>
    !isActive
      ? isLogined
        ? theme.color.gray_83
        : theme.color.gray_bf
      : theme.color.gray_3c};
  font-size: ${({ theme }) => theme.fontSize.caption1};
  font-weight: ${({ theme }) => theme.fontWeight.caption1};
`;
