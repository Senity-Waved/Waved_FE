import styled from '@emotion/styled';
import Image from 'next/image';

interface IEmptyView {}

export default function EmptyView() {
  return (
    <SWrapper>
      <SEmptyTitle>아직 내 챌린지가 없어요</SEmptyTitle>
      <SEmptySubText>챌린지를 신청하고 내 챌린지를 시작해보세요!</SEmptySubText>
      <Image
        src="/images/img-empty.png"
        alt="데이터가 없을때 나오는 Empty view 화면 일러스트"
        width={84}
        height={84}
      />
    </SWrapper>
  );
}

const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  background-color: ${({ theme }) => theme.color.white};
  padding: 2rem;
`;

const SEmptyTitle = styled.h2`
  font-size: 1.125rem;
  line-height: 1.4;
  font-weight: ${({ theme }) => theme.fontWeight.subtitle1};
  color: ${({ theme }) => theme.color.gray_99};
`;

const SEmptySubText = styled.p`
  font-size: 0.875rem;
  line-height: 1.4;
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  color: ${({ theme }) => theme.color.gray_99};
  margin-bottom: 0.25rem;
`;
