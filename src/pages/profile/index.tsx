import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/common/Layout';

export default function Profile() {
  return (
    <Layout noHeader>
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
        <SProfileShortcutWrapper>
          <h3 className="a11yHidden">프로필 인사말</h3>
          <SProfileGreetingWrapper>
            <p>
              <span>웨이브드</span> 프론트엔드
            </p>
            <p>개발자님 오늘도 화이팅하세요!</p>
          </SProfileGreetingWrapper>
          <SGithubIdBtnWrapper>
            <Image
              src="/icons/icon-github-logo.svg"
              alt="깃허브 로고"
              width={18}
              height={18}
            />
            <SGithubIdBtn type="button">깃허브 연동하기</SGithubIdBtn>
          </SGithubIdBtnWrapper>
        </SProfileShortcutWrapper>
        <div>
          <h3>챌린지 기록</h3>
          <ul>
            <SProfileMenuWrapper>
              <Link href="/">
                <p>나의 후기</p>
                <Image
                  src="/icons/icon-left-arrow.svg"
                  alt="화살표 아이콘"
                  width={24}
                  height={24}
                  style={{ transform: 'rotate(180deg)' }}
                />
              </Link>
            </SProfileMenuWrapper>
            <SProfileMenuWrapper>
              <Link href="/">
                <p>예치금 내역</p>
                <Image
                  src="/icons/icon-left-arrow.svg"
                  alt="화살표 아이콘"
                  width={24}
                  height={24}
                  style={{ transform: 'rotate(180deg)' }}
                />
              </Link>
            </SProfileMenuWrapper>
          </ul>
        </div>
        <div>
          <h3>계정 설정</h3>
          <ul>
            <SProfileMenuWrapper>
              <Link href="/">
                <p>프로필 수정</p>
                <Image
                  src="/icons/icon-left-arrow.svg"
                  alt="화살표 아이콘"
                  width={24}
                  height={24}
                  style={{ transform: 'rotate(180deg)' }}
                />
              </Link>
            </SProfileMenuWrapper>
            <SProfileMenuWrapper>
              <Link href="/">
                <p>깃허브 연동 관리</p>
                <Image
                  src="/icons/icon-left-arrow.svg"
                  alt="화살표 아이콘"
                  width={24}
                  height={24}
                  style={{ transform: 'rotate(180deg)' }}
                />
              </Link>
            </SProfileMenuWrapper>
            <SLogoutBtnWrapper>
              <button type="button">로그아웃</button>
            </SLogoutBtnWrapper>
          </ul>
        </div>
        <div>
          <h3>고객 센터</h3>
          <ul>
            <SProfileMenuWrapper>
              <Link href="/">
                <p>자주 묻는 질문</p>
                <Image
                  src="/icons/icon-left-arrow.svg"
                  alt="화살표 아이콘"
                  width={24}
                  height={24}
                  style={{ transform: 'rotate(180deg)' }}
                />
              </Link>
            </SProfileMenuWrapper>
            <SProfileMenuWrapper>
              <Link href="/">
                <p>1:1 문의하기</p>
                <Image
                  src="/icons/icon-left-arrow.svg"
                  alt="화살표 아이콘"
                  width={24}
                  height={24}
                  style={{ transform: 'rotate(180deg)' }}
                />
              </Link>
            </SProfileMenuWrapper>
            <SProfileMenuWrapper>
              <Link href="/">
                <p>챌린지 요청</p>
                <Image
                  src="/icons/icon-left-arrow.svg"
                  alt="화살표 아이콘"
                  width={24}
                  height={24}
                  style={{ transform: 'rotate(180deg)' }}
                />
              </Link>
            </SProfileMenuWrapper>
            <SProfileMenuWrapper>
              <Link href="/">
                <p>약관 및 정책</p>
                <Image
                  src="/icons/icon-left-arrow.svg"
                  alt="화살표 아이콘"
                  width={24}
                  height={24}
                  style={{ transform: 'rotate(180deg)' }}
                />
              </Link>
            </SProfileMenuWrapper>
          </ul>
        </div>
        <SProfileEtc>
          <div>
            <p>현재 버전</p>
            <p>1.0.0</p>
          </div>
        </SProfileEtc>
        <SwithdrawalBtnWrapper>
          <button type="button">회원 탈퇴</button>
        </SwithdrawalBtnWrapper>
      </SProfileWrapper>
    </Layout>
  );
}

const SProfileWrapper = styled.div`
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  margin: 0 1.25rem;

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

const SProfileMenuWrapper = styled.li`
  position: relative;

  & > a {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    height: 56px;
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

const SProfileShortcutWrapper = styled.div`
  height: 162px;
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
  width: 335px;
  height: 70px;

  & p {
    font-size: ${({ theme }) => theme.fontSize.headline1};
    font-weight: ${({ theme }) => theme.fontWeight.headline1};
  }

  & span {
    color: ${({ theme }) => theme.color.normal};
  }
`;

const SGithubIdBtnWrapper = styled.div`
  width: 134px;
  height: 28px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.color.gray_83};
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding-left: 0.625rem;
`;

const SGithubIdBtn = styled.button`
  color: ${({ theme }) => theme.color.gray_f9};
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  margin-left: 0.5rem;
`;

const SProfileEtc = styled.div`
  position: relative;
  color: ${({ theme }) => theme.color.gray_99};
  font-size: ${({ theme }) => theme.fontSize.body2};
  font-weight: ${({ theme }) => theme.fontWeight.body2};

  & > div {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    height: 56px;
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

const SLogoutBtnWrapper = styled.li`
  position: relative;

  & button {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    height: 56px;
    font-size: ${({ theme }) => theme.fontSize.body2};
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
