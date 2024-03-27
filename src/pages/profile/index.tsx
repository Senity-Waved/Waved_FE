import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Layout from '@/components/common/Layout';
import ProfileShortcut from '@/components/profile/ProfileShortcut';
import SnackBar from '@/components/common/SnackBar';
import profileSnackBarText from '@/constants/profileSnackBarText';
import Modal from '@/components/modal/Modal';
import ISnackBarState from '@/types/snackbar';
import { deleteMemberApi, logoutApi } from '@/lib/axios/profile/api';
import useModal from '@/hooks/useModal';
import IProfile from '@/types/profile';
import createServerInstance from '@/lib/axios/serverInstance';

interface IProfileProps {
  profileInfo: IProfile;
  isLogined: boolean;
}

export default function Profile({ profileInfo, isLogined }: IProfileProps) {
  const router = useRouter();
  const { query } = useRouter();
  const { openModal, closeModal } = useModal();

  const [snackBarState, setSnackBarState] = useState<ISnackBarState>({
    open: false,
    text: '',
    type: 'correct',
  });

  const handleWithdrawal = () => {
    deleteMemberApi()
      .then((response) => {
        console.log('백엔드 서버에서 탈퇴 처리 성공:', response);

        // 백엔드 탈퇴 성공 후 클라이언트 측 토큰 제거
        axios
          .post(
            '/api/auth/unregister',
            {},
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
          .then((res) => {
            console.log('클라이언트 측에서 탈퇴 처리 성공:', res.data);

            // 탈퇴 처리 후 리다이렉션
            router
              .push({
                pathname: '/',
                query: { withdrawal: true },
              })
              .catch((error) => {
                console.error('탈퇴 후 온보딩 리디렉션 실패:', error);
              });
          })
          .catch((error) => {
            console.error('클라이언트 측에서 탈퇴 처리 중 오류 발생:', error);
          });
      })
      .catch((error) => {
        console.error('백엔드 서버 탈퇴 처리 중 오류 발생:', error);
      });
  };

  const handleLogout = () => {
    logoutApi()
      .then((response) => {
        console.log('백엔드 서버에서 로그아웃 처리 성공:', response);

        // 백엔드 로그아웃 성공 후 클라이언트 측 로그아웃 처리
        axios
          .post(
            '/api/auth/logout',
            {},
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
          .then((res) => {
            console.log('클라이언트 측에서 로그아웃 처리 성공:', res.data);

            // 로그아웃 처리 후 리다이렉션
            router
              .push({
                pathname: '/',
                query: { logout: true },
              })
              .catch((error) => {
                console.error('로그아웃 후 온보딩 리디렉션 실패:', error);
              });
          })
          .catch((error) => {
            console.error(
              '클라이언트 측에서 로그아웃 처리 중 오류 발생:',
              error,
            );
          });
      })
      .catch((error) => {
        console.error('백엔드 서버 로그아웃 처리 중 오류 발생:', error);
      });
  };

  useEffect(() => {
    const handleRouting = (
      snackBarText: string,
      snackBarType: 'correct' | 'warning' = 'correct',
    ): void => {
      setSnackBarState({ open: true, text: snackBarText, type: snackBarType });
      router
        .replace('/profile', undefined, { shallow: true })
        .catch((error: Error) =>
          console.error('쿼리스트링 제거 후 페이지 이동 실패', error),
        );
    };

    if (query.profileEdit) {
      handleRouting(profileSnackBarText.PROFILE_EDIT);
    } else if (query.linkedCancel) {
      handleRouting(profileSnackBarText.LINKED_CANCEL);
    } else if (query.githubLinked) {
      handleRouting(profileSnackBarText.GITHUB_LINKED);
    } else if (query.linkedFail) {
      handleRouting(profileSnackBarText.LINKED_FAIL, 'warning');
    }
  }, [query, router]);

  return (
    <Layout
      noHeader
      title="프로필"
      description="WAVED 회원의 프로필 페이지입니다. 챌린지 기록, 계정 설정, 고객 센터 등을 확인할 수 있습니다. "
    >
      <SProfileWrapper>
        <h2 className="a11yHidden">프로필</h2>
        <ProfileShortcut isLogined={isLogined} profileInfo={profileInfo} />
        <div>
          <h3>챌린지 기록</h3>
          <ul>
            <SProfileActiveMenuWrapper isLogined={isLogined}>
              <Link href="/profile/myreview">
                <p>나의 후기</p>
                <Image
                  src={
                    isLogined
                      ? '/icons/icon-down-arrow.svg'
                      : '/icons/icon-small-arrow.svg'
                  }
                  alt="화살표 아이콘"
                  width={24}
                  height={24}
                  style={{
                    transform: isLogined ? 'rotate(270deg)' : 'rotate(360deg)',
                  }}
                />
              </Link>
            </SProfileActiveMenuWrapper>
            <SProfileActiveMenuWrapper isLogined={isLogined}>
              <Link href="/profile/mydeposit">
                <p>예치금 내역</p>
                <Image
                  src={
                    isLogined
                      ? '/icons/icon-down-arrow.svg'
                      : '/icons/icon-small-arrow.svg'
                  }
                  alt="화살표 아이콘"
                  width={24}
                  height={24}
                  style={{
                    transform: isLogined ? 'rotate(270deg)' : 'rotate(360deg)',
                  }}
                />
              </Link>
            </SProfileActiveMenuWrapper>
          </ul>
        </div>
        <div>
          <h3>계정 설정</h3>
          <ul>
            <SProfileActiveMenuWrapper isLogined={isLogined}>
              <Link href="/profile/edit">
                <p>프로필 수정</p>
                <Image
                  src={
                    isLogined
                      ? '/icons/icon-down-arrow.svg'
                      : '/icons/icon-small-arrow.svg'
                  }
                  alt="화살표 아이콘"
                  width={24}
                  height={24}
                  style={{
                    transform: isLogined ? 'rotate(270deg)' : 'rotate(360deg)',
                  }}
                />
              </Link>
            </SProfileActiveMenuWrapper>
            <SProfileActiveMenuWrapper isLogined={isLogined}>
              <Link href="/profile/mygithub">
                <p>깃허브 연동 관리</p>
                <Image
                  src={
                    isLogined
                      ? '/icons/icon-down-arrow.svg'
                      : '/icons/icon-small-arrow.svg'
                  }
                  alt="화살표 아이콘"
                  width={24}
                  height={24}
                  style={{
                    transform: isLogined ? 'rotate(270deg)' : 'rotate(360deg)',
                  }}
                />
              </Link>
            </SProfileActiveMenuWrapper>
            <SLogoutBtnWrapper isLogined={isLogined}>
              <button
                type="button"
                onClick={() => {
                  openModal({
                    image: '/icons/icon-exclamation-mark.svg',
                    mainText: '로그아웃',
                    subText: '로그아웃하시겠습니까?',
                    btnText: '로그아웃',
                    onClick: () => {
                      handleLogout();
                      closeModal();
                    },
                  });
                }}
              >
                로그아웃
              </button>
            </SLogoutBtnWrapper>
          </ul>
        </div>
        <div>
          <h3>고객 센터</h3>
          <ul>
            <SPropfileBaseMenuWrapper>
              <Link href="/">
                <p>자주 묻는 질문</p>
                <Image
                  src="/icons/icon-down-arrow.svg"
                  alt="화살표 아이콘"
                  width={24}
                  height={24}
                  style={{ transform: 'rotate(270deg)' }}
                />
              </Link>
            </SPropfileBaseMenuWrapper>
            <SPropfileBaseMenuWrapper>
              <Link href="/">
                <p>1:1 문의하기</p>
                <Image
                  src="/icons/icon-down-arrow.svg"
                  alt="화살표 아이콘"
                  width={24}
                  height={24}
                  style={{ transform: 'rotate(270deg)' }}
                />
              </Link>
            </SPropfileBaseMenuWrapper>
            <SProfileActiveMenuWrapper isLogined={isLogined}>
              <Link href="/">
                <p>챌린지 요청</p>
                <Image
                  src={
                    isLogined
                      ? '/icons/icon-down-arrow.svg'
                      : '/icons/icon-small-arrow.svg'
                  }
                  alt="화살표 아이콘"
                  width={24}
                  height={24}
                  style={{
                    transform: isLogined ? 'rotate(270deg)' : 'rotate(360deg)',
                  }}
                />
              </Link>
            </SProfileActiveMenuWrapper>
            <SPropfileBaseMenuWrapper>
              <Link href="/">
                <p>약관 및 정책</p>
                <Image
                  src="/icons/icon-down-arrow.svg"
                  alt="화살표 아이콘"
                  width={24}
                  height={24}
                  style={{ transform: 'rotate(270deg)' }}
                />
              </Link>
            </SPropfileBaseMenuWrapper>
          </ul>
        </div>
        <SProfileEtc>
          <div>
            <p>현재 버전</p>
            <p>1.0.0</p>
          </div>
        </SProfileEtc>
        <SwithdrawalBtnWrapper>
          {isLogined && (
            <button
              type="button"
              onClick={() => {
                openModal({
                  image: '/icons/icon-exclamation-mark.svg',
                  mainText: '정말 계정을 탈퇴하시겠습니까?',
                  subText:
                    '탈퇴 이후에 예치금을 돌려받으실 수 없으며, 등록된 정보는 전부 삭제되어 재가입 후에도 확인하실 수 없습니다.',
                  btnText: '네, 탈퇴할게요.',
                  onClick: () => {
                    handleWithdrawal();
                    closeModal();
                  },
                });
              }}
            >
              회원 탈퇴
            </button>
          )}
        </SwithdrawalBtnWrapper>
      </SProfileWrapper>
      {snackBarState.open && (
        <SnackBar text={snackBarState.text} type={snackBarState.type} />
      )}
      <Modal />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  let profileInfo = null;
  const cookieToken = getCookie('accessToken', context);
  const isLogined = !!cookieToken;

  const serverInstance = createServerInstance(context);

  try {
    const response = await serverInstance.get<IProfile>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/members/profile`,
    );

    profileInfo = response.data;
  } catch (error) {
    console.error('💦 로그인 유저 프로필 조회 실패', error);
  }

  return {
    props: {
      profileInfo,
      isLogined,
    },
  };
};

const SProfileWrapper = styled.div`
  margin: 0 1.25rem;

  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  & h3 {
    font-size: ${({ theme }) => theme.fontSize.subtitle1};
    font-weight: ${({ theme }) => theme.fontWeight.subtitle1};
    margin-top: 2rem;
  }
`;

const SPropfileBaseMenuWrapper = styled.li<{ isLogined?: boolean }>`
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray_ec};

  & p {
    font-weight: ${({ theme }) => theme.fontWeight.body2};
    font-size: ${({ theme }) => theme.fontSize.body2};
  }

  & > a {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    height: 56px;
  }
`;

const SProfileActiveMenuWrapper = styled(SPropfileBaseMenuWrapper)`
  & > a {
    color: ${({ theme, isLogined }) =>
      isLogined ? theme.color.gray_3c : theme.color.gray_bf};
    cursor: ${({ isLogined }) => (isLogined ? 'pointer' : 'not-allowed')};
    pointer-events: ${({ isLogined }) => (isLogined ? 'auto' : 'none')};
  }
`;

const SProfileEtc = styled.div`
  position: relative;
  color: ${({ theme }) => theme.color.gray_99};
  font-size: ${({ theme }) => theme.fontSize.body2};
  font-weight: ${({ theme }) => theme.fontWeight.body2};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray_ec};

  & > div {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    height: 56px;
  }
`;

const SLogoutBtnWrapper = styled.li<{ isLogined: boolean }>`
  position: relative;

  & button {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    height: 56px;
    font-size: ${({ theme }) => theme.fontSize.body2};
    color: ${({ theme, isLogined }) =>
      isLogined ? theme.color.gray_3c : theme.color.gray_bf};
    cursor: ${({ isLogined }) => (isLogined ? 'pointer' : 'not-allowed')};
    pointer-events: ${({ isLogined }) => (isLogined ? 'auto' : 'none')};
  }

  &::after {
    content: ' ';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.color.gray_ec};
  }
`;

const SwithdrawalBtnWrapper = styled.div`
  height: 84px;
  text-align: right;
  line-height: 84px;
  margin-bottom: 2.5rem;

  & button {
    font-size: ${({ theme }) => theme.fontSize.body4};
    font-weight: ${({ theme }) => theme.fontWeight.body4};
    color: ${({ theme }) => theme.color.gray_bf};
    border-bottom: 1px solid ${({ theme }) => theme.color.gray_bf};
  }
`;
