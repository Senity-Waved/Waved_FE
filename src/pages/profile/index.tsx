import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '@/components/common/Layout';
import JOBTITLE from '@/constants/jobTitle';
import ProfileShortcut from '@/components/profile/ProfileShortcut';
import SnackBar from '@/components/common/SnackBar';
import profileSnackBarText from '@/constants/profileSnackBarText';
import Portal from '@/components/modal/ModalPortal';
import Modal from '@/components/modal/Modal';
import ISnackBarState from '@/types/snackbar';

export default function Profile() {
  const router = useRouter();
  const { query } = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState<string>('');
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const isLogined = true;

  const profileInfo = {
    nickName: '웨이브드',
    jobTitle: JOBTITLE.FRONT && '프론트엔드',
    githubId: 'hello_world',
  };

  const [snackBarState, setSnackBarState] = useState<ISnackBarState>({
    open: false,
    text: '',
    type: 'correct',
  });

  const clickModalBtn = () => {
    router
      .push({
        pathname: '/onboarding',
        query:
          modalState === 'logout' ? { logout: true } : { withdrawal: true },
      })
      .catch((error: Error) => {
        console.error(
          modalState === 'logout'
            ? '로그아웃에 실패하였습니다.'
            : '회원 탈퇴에 실패하였습니다.',
          error,
        );
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
      <SNotificationBtn type="button">
        <Image
          src="/icons/icon-notification.svg"
          alt="알림 아이콘"
          width={24}
          height={24}
        />
      </SNotificationBtn>
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
                  openModal();
                  setModalState('logout');
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
                openModal();
                setModalState('withdrawal');
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
      {isModalOpen && (
        <Portal>
          <Modal
            image="/icons/icon-exclamation-mark.svg"
            mainText={
              modalState === 'logout'
                ? '로그아웃'
                : '정말 계정을 탈퇴하시겠습니까?'
            }
            subText={
              modalState === 'logout'
                ? '로그아웃하시겠습니까?'
                : '탈퇴 이후에 예치금을 돌려받으실 수 없으며, 등록된 정보는 전부 삭제되어 재가입 후에도 확인하실 수 없습니다.'
            }
            btnText={modalState === 'logout' ? '로그아웃' : '네, 탈퇴할게요.'}
            onClick={clickModalBtn}
            onClose={closeModal}
          />
        </Portal>
      )}
    </Layout>
  );
}

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

const SNotificationBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
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
