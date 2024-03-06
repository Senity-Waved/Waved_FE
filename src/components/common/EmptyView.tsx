import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';

interface IEmptyView {
  pageType: '마이챌린지' | '후기내역' | '예치금내역';
}

const emptyText = {
  마이챌린지: [
    '아직 내 챌린지가 없어요',
    '챌린지를 신청하고 내 챌린지를 시작해보세요!',
  ],
  후기내역: [
    '남기신 후기가 없어요',
    '마이챌린지에서 참여하신 챌린지 후기를 남겨보세요!',
  ],
  예치금내역: [
    '예치금 내역이 없어요',
    '예치금을 걸어서 챌린지에 참여해보세요!',
  ],
};

export default function EmptyView({ pageType }: IEmptyView) {
  const mainText = emptyText[pageType][0];
  const subText = emptyText[pageType][1];

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
  gap: 0.25rem;
  ${({ pageType }) => (pageType === '마이챌린지' ? '' : centerStyle)}
`;

const SEmptyMainText = styled.h2`
  font-size: 1.125rem;
  line-height: 1.4;
  font-weight: ${({ theme }) => theme.fontWeight.subtitle1};
  color: ${({ theme }) => theme.color.gray_99};
  margin-bottom: 0.25rem;
`;

const SEmptySubText = styled.p`
  font-size: 0.875rem;
  line-height: 1.4;
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  color: ${({ theme }) => theme.color.gray_99};
`;
