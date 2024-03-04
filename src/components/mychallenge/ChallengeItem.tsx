import styled from '@emotion/styled';
import Image from 'next/image';
import ChallengeProgress from './ChallengeProgress';
import ChallengeBtn from './ChallengeBtn';

export interface IChallengeItem {
  // challengeId: number;
  // title: string;
  // status: '진행중' | '대기중' | '진행완료';
  // startDate: number;
  // endDate: number;
  // certificationType: '글' | '링크' | '사진' | '커밋';
  // successCount: number;
  // failCount: number;
  // totalCount: number;
  // deposit: number;
  // isTodayCertification: boolean;
  // isReviewd: boolean;
}

export default function ChallengeItem({}: IChallengeItem) {
  return (
    <SWrapper>
      <STitle>챌린지명</STitle>
      <SDetailBtn>
        <Image
          src="/icons/icon-right-arrow.svg"
          alt="뒤로가기 아이콘"
          width={24}
          height={24}
        />
      </SDetailBtn>
      <SInfoWrapper>
        <SStatusLabel>진행 중</SStatusLabel>
        <SDuration>02/19~03/04, 주 3일</SDuration>
        <SDeposit>
          <span>예치금</span>
          <span>10,000원</span>
        </SDeposit>
      </SInfoWrapper>
      <ChallengeProgress />
      <ChallengeBtn challengeStatus="진행중" disabled={false} />
    </SWrapper>
  );
}

const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  padding: 1rem;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 0 3px 8px 2px rgba(35, 62, 112, 0.05);
  border-radius: 8px;
`;

const STitle = styled.h3`
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: ${({ theme }) => theme.fontWeight.body2};
  color: ${({ theme }) => theme.color.gray_3c};
`;

const SDetailBtn = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  height: 1.5rem;
`;

const SInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.fontWeight.caption2};
  color: ${({ theme }) => theme.color.gray_3c};
`;

const SStatusLabel = styled.div`
  font-size: 0.75rem;
  line-height: 1.4;
  font-weight: ${({ theme }) => theme.fontWeight.caption1};
  color: ${({ theme }) => theme.color.gray_52};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.color.gray_f9};
  padding: 0.375rem 0.5rem;
`;

const SDuration = styled.p`
  margin-right: 1.25rem;
`;

const SDeposit = styled.p`
  span {
    padding-right: 0.5rem;
  }
`;
