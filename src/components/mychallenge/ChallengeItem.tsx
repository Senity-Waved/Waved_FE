import styled from '@emotion/styled';
import Image from 'next/image';
import ChallengeProgress from '@/components/mychallenge/ChallengeProgress';
import ChallengeBtn from '@/components/mychallenge/ChallengeBtn';

export interface IChallengeItem {
  // challengeId: number;
  // title: string;
  status: '진행 중' | '대기 중' | '진행 완료';
  // startDate: number;
  // endDate: number;
  // certificationType: '글' | '링크' | '사진' | '자동';
  // successCount?: number;
  // failCount?: number;
  // totalCount?: number;
  // deposit: number;
  // isTodayCertification?: boolean;
  // isReviewd?: boolean;
}

export default function ChallengeItem({ status }: IChallengeItem) {
  return (
    <SWrapper>
      <SInfoWrapper>
        <h3>챌린지명</h3>
        <div>
          <SDuration>02/19~03/04, 주 3일</SDuration>
          <SDeposit>
            <span>예치금</span>
            <span>10,000원</span>
          </SDeposit>
        </div>
      </SInfoWrapper>
      {status === '진행 중' && <ChallengeProgress />}
      <ChallengeBtn challengeStatus={status} isAbled />
      <SDetailBtn>
        <Image
          src="/icons/icon-left-arrow.svg"
          alt="뒤로가기 아이콘"
          width={24}
          height={24}
        />
      </SDetailBtn>
    </SWrapper>
  );
}

const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  padding: 1rem;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 0 3px 8px 2px rgba(35, 62, 112, 0.05);
  border-radius: 8px;
`;

const SDetailBtn = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  height: 24px;
  transform: rotate(180deg);
`;

const SInfoWrapper = styled.div`
  h3 {
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: ${({ theme }) => theme.fontWeight.body2};
    color: ${({ theme }) => theme.color.gray_3c};
    margin-bottom: 0.5rem;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    font-size: 0.75rem;
    font-weight: ${({ theme }) => theme.fontWeight.caption2};
    color: ${({ theme }) => theme.color.gray_3c};
  }
`;

const SDuration = styled.p``;

const SDeposit = styled.p`
  span {
    padding-right: 0.5rem;
  }
`;
