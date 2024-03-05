import styled from '@emotion/styled';
import Image from 'next/image';
import ChallengeProgress from '@/components/mychallenge/ChallengeProgress';
import ChallengeBtn from '@/components/mychallenge/ChallengeBtn';

export interface IChallengeItem {
  // challengeId: number;
  // title: string;
  status: '진행중' | '대기중' | '진행완료';
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

const statusLabel = {
  진행중: '진행 중',
  대기중: '시작 전',
  진행완료: '완료',
};

export default function ChallengeItem({ status }: IChallengeItem) {
  return (
    <SWrapper>
      <SInfoWrapper>
        <h3>챌린지명</h3>
        <div>
          <SStatusLabel>{statusLabel[status]}</SStatusLabel>
          <SDuration>02/19~03/04, 주 3일</SDuration>
          <SDeposit>
            <span>예치금</span>
            <span>10,000원</span>
          </SDeposit>
        </div>
      </SInfoWrapper>
      {/* {totalCount === successCount && <SCompletedWrapper>
        <p>모든 인증을 완료했어요 🎉</p>
        <span>획득한 인증패스는 인증내역에서 확인할 수 있어요.</span>
      </SCompletedWrapper>} */}
      {status !== '대기중' && <ChallengeProgress />}
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
  height: 1.5rem;
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

const SCompletedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.color.gray_ec};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.gray_f9};
  padding: 0.75rem 1rem;
  line-height: 1.4;

  p {
    color: ${({ theme }) => theme.color.gray_3c};
    font-size: 0.875rem;
    font-weight: ${({ theme }) => theme.fontWeight.body3};
  }

  span {
    color: ${({ theme }) => theme.color.gray_52};
    font-size: 0.75rem;
    font-weight: ${({ theme }) => theme.fontWeight.caption2};
  }
`;
