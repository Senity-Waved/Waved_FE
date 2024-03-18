import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import emptyText from '@/constants/emptyText';

interface IEmptyView {
  pageType:
    | '모집챌린지'
    | '마이챌린지'
    | '챌린지후기'
    | '내후기'
    | '예치금내역';
}

export default function EmptyView({ pageType }: IEmptyView) {
  const { mainText } = emptyText[pageType];
  const { subText } = emptyText[pageType];

  return (
    <SEmptyWrapper pageType={pageType}>
      <Image
        src="/icons/icon-empty-character.svg"
        alt="데이터가 없을때 나오는 Empty view 화면 일러스트"
        width={84}
        height={84}
        priority
      />
      <SEmptyMainText>{mainText}</SEmptyMainText>
      <SEmptySubText>{subText}</SEmptySubText>
    </SEmptyWrapper>
  );
}

const centerStyle = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -75%);
`;

const SEmptyWrapper = styled.div<IEmptyView>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  ${({ pageType }) => (pageType === '마이챌린지' ? '' : centerStyle)}
`;

const SEmptyMainText = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.headline2};
  font-weight: ${({ theme }) => theme.fontWeight.headline2};
  color: ${({ theme }) => theme.color.gray_bf};
`;

const SEmptySubText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  color: ${({ theme }) => theme.color.gray_bf};
`;
