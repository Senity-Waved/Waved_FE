import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <SFooterWrapper>
      <SFooterIconBox href="/">
        <Image
          src="/icons/icon-home-filled.svg"
          alt="홈 아이콘"
          width={24}
          height={24}
          priority
        />
        <p>홈</p>
      </SFooterIconBox>
      <SFooterIconBox href="#">
        <Image
          src="/icons/icon-mychallenge-normal.svg"
          alt="마이 챌린지 아이콘"
          width={24}
          height={24}
          priority
        />
        <p>마이 챌린지</p>
      </SFooterIconBox>
      <SFooterIconBox href="#">
        <Image
          src="/icons/icon-profile-normal.svg"
          alt="프로필 아이콘"
          width={24}
          height={24}
          priority
        />
        <p>프로필</p>
      </SFooterIconBox>
    </SFooterWrapper>
  );
}

const SFooterWrapper = styled.nav`
  width: 100%;
  height: 56px;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  gap: 56px;
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  border-top: 1px solid #dee1e5;
  padding: 10px 20px 0 20px;
`;

const SFooterIconBox = styled(Link)`
  width: 74px;
  height: 43px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-between;
`;
