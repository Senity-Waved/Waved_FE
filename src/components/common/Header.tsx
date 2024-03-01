/* eslint-disable react/require-default-props */
import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface IHeader {
  headerText?: string;
  rightText?: string;
}

export default function Header({ headerText, rightText }: IHeader) {
  const router = useRouter();
  return (
    <SHeaderWrapper>
      <SHeaderLeftChild>
        <SBackBtn type="button" onClick={() => router.back()}>
          <Image
            src="/icons/icon-left-arrow.svg"
            alt="뒤로가기 아이콘"
            width={24}
            height={24}
            priority
          />
        </SBackBtn>
        {headerText && <span>{headerText}</span>}
      </SHeaderLeftChild>
      {rightText && (
        <SHeaderRightChild>
          <span>{rightText}</span>
        </SHeaderRightChild>
      )}
    </SHeaderWrapper>
  );
}

const SHeaderWrapper = styled.header`
  width: 100%;
  height: 56px;
  line-height: 56px;
  font-size: 1.125rem;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
`;

const SBackBtn = styled.button`
  margin-left: ${({ theme }) => theme.spacing.md};
  margin-right: ${({ theme }) => theme.spacing.xs};
`;

const SHeaderLeftChild = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;
const SHeaderRightChild = styled.div`
  margin-right: 18px;
  font-size: 1.125rem;
`;
