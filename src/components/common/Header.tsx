import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface IHeader {
  headerText?: string;
  rightText?: string;
  rightOnClick?: () => void;
}

export default function Header({
  headerText,
  rightText,
  rightOnClick,
}: IHeader) {
  const router = useRouter();
  return (
    <SHeaderWrapper>
      <SBackBtn
        type="button"
        onClick={() => router.back()}
        aria-label="뒤로 가기"
      >
        <Image
          src="/icons/icon-left-arrow.svg"
          alt="뒤로가기 아이콘"
          width={24}
          height={24}
          priority
        />
      </SBackBtn>
      <SHeaderCenter>{headerText && <span>{headerText}</span>}</SHeaderCenter>
      <SHeaderRightChild onClick={rightOnClick}>
        <span>{rightText}</span>
      </SHeaderRightChild>
    </SHeaderWrapper>
  );
}

const SHeaderWrapper = styled.header`
  z-index: 10;
  flex-shrink: 0;
  position: relative;
  width: 100%;
  height: 56px;
  line-height: 56px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const SBackBtn = styled.button`
  position: absolute;
  left: 0;
  margin-left: ${({ theme }) => theme.spacing.md};
  margin-right: ${({ theme }) => theme.spacing.xs};
`;

const SHeaderCenter = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 auto;
  font-size: 1.25rem;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

const SHeaderRightChild = styled.div`
  position: absolute;
  right: 0;
  margin-right: 1.125rem;
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;
