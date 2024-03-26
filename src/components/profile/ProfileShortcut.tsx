import styled from '@emotion/styled';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { JOB_TITLE_KR } from '@/constants/jobTitle';
import IProfile from '@/types/profile';

interface IProfileProps {
  isLogined: boolean;
  profileInfo: IProfile;
}

export default function ProfileShortcut({
  isLogined,
  profileInfo,
}: IProfileProps) {
  const router = useRouter();

  const goToGithub = () => {
    router.push('/profile/mygithub').catch((error) => {
      console.error('페이지 이동에 실패하였습니다.', error);
    });
  };

  return (
    <SProfileShortcutWrapper>
      <h3 className="a11yHidden">프로필 인사말</h3>
      <SProfileGreetingWrapper>
        {isLogined && profileInfo ? (
          <p>
            <span>{profileInfo.nickname}</span>
            {profileInfo.jobTitle && (
              <span>&nbsp;{JOB_TITLE_KR[profileInfo.jobTitle]}</span>
            )}
          </p>
        ) : (
          <Link href="/onboarding">
            <p>
              <span>로그인</span>&nbsp;혹은&nbsp;<span>회원가입</span>
              <Image
                src="/icons/icon-down-arrow.svg"
                alt="화살표 아이콘"
                width={34}
                height={34}
                style={{ transform: 'rotate(270deg)' }}
              />
            </p>
          </Link>
        )}
        <p>개발자님 오늘도 화이팅하세요!</p>
      </SProfileGreetingWrapper>
      {isLogined && (
        <SGithubIdBtn
          type="button"
          onClick={goToGithub}
          isGithub={!!profileInfo.githubId}
        >
          <Image
            src="/icons/icon-github-logo.svg"
            alt="깃허브 로고"
            width={18}
            height={18}
          />
          <p>
            {isLogined && profileInfo.githubId
              ? profileInfo.githubId
              : '깃허브 연동하기'}
          </p>
        </SGithubIdBtn>
      )}
    </SProfileShortcutWrapper>
  );
}

const SProfileShortcutWrapper = styled.div`
  margin-top: 3.5rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  gap: 1.5rem;

  &::after {
    content: ' ';
    width: calc(100% + 2.5rem);
    border-bottom: 6px solid ${({ theme }) => theme.color.gray_ec};
    position: relative;
    left: -1.25rem;
  }
`;

const SProfileGreetingWrapper = styled.div`
  width: 336px;
  height: 70px;

  & p {
    font-size: ${({ theme }) => theme.fontSize.headline1};
    font-weight: ${({ theme }) => theme.fontWeight.headline1};
    display: inline-flex;
    flex-flow: row nowrap;
    align-items: center;
  }

  & span:first-of-type {
    color: ${({ theme }) => theme.color.normal};
  }
`;

const SGithubIdBtn = styled.button<{ isGithub: boolean }>`
  margin-right: auto;
  height: 28px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.color.gray_83};
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0 0.625rem;
  color: ${({ theme }) => theme.color.gray_f9};
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
`;
