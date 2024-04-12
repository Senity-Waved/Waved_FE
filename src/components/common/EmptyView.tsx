import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import emptyViewType from '@/constants/emptyViewType';

interface IEmptyView {
  pageType:
    | '모집챌린지'
    | '마이챌린지'
    | 'PROGRESS'
    | 'WAITING'
    | 'COMPLETED'
    | '챌린지후기'
    | '내후기'
    | '예치금내역'
    | '인증내역'
    | '기술면접인증'
    | '커밋인증'
    | '알림내역';
  center?: boolean;
}

export default function EmptyView({ pageType, center = true }: IEmptyView) {
  const { mainText } = emptyViewType[pageType];
  const { subText } = emptyViewType[pageType];
  const { imagePath } = emptyViewType[pageType];

  return (
    <SEmptyWrapper center={center} pageType={pageType}>
      <Image
        src={imagePath}
        alt="데이터가 없을때 나오는 Empty view 화면 일러스트"
        width={235}
        height={215}
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
  transform: translate(-50%, -50%);
`;

const SEmptyWrapper = styled.div<IEmptyView>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  ${({ center }) => (center ? centerStyle : '')}
`;

const SEmptyMainText = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.headline2};
  font-weight: ${({ theme }) => theme.fontWeight.headline2};
  color: ${({ theme }) => theme.color.gray_3c};
  margin-top: 0.5rem;
`;

const SEmptySubText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  color: ${({ theme }) => theme.color.gray_52};
`;
