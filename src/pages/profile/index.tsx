import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/common/Layout';
import JOBTITLE from '@/constants/jobTitle';
import ProfileShortcut from '@/components/profile/ProfileShortcut';

export default function Profile() {
  const profileInfo = {
    nickName: '웨이브드',
    jobTitle: JOBTITLE.FRONT && '프론트엔드',
    githubId: 'hello_world',
  };
  const isLogined = true;
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
              <Link href="/">
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
              <Link href="/">
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
              <Link href="/profile/github">
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
              <button type="button">로그아웃</button>
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
          {isLogined && <button type="button">회원 탈퇴</button>}
        </SwithdrawalBtnWrapper>
      </SProfileWrapper>
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
  margin-bottom: 40px;

  & button {
    font-size: ${({ theme }) => theme.fontSize.body4};
    font-weight: ${({ theme }) => theme.fontWeight.body4};
    color: ${({ theme }) => theme.color.gray_bf};
    border-bottom: 1px solid ${({ theme }) => theme.color.gray_bf};
  }
`;
