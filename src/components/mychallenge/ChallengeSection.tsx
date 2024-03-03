import styled from '@emotion/styled';
import ChallengeCard, { IChallengeCard } from './ChallengeCard';

interface IChallengeSection {
  status: '진행중' | '대기중' | '진행완료';
  statusImogi: '🧑🏻‍💻' | '👀' | '🥳';
  subText: string;
  // challenges: IChallengeCard[];
}

export default function ChallengeSection({
  status,
  statusImogi,
  subText,
  // challenges,
}: IChallengeSection) {
  return (
    <SWrapper>
      <div>
        <SStatus>
          {status} {statusImogi}
        </SStatus>
        <SSubText>{subText}</SSubText>
      </div>
      {/* challenges.map */}
      <ChallengeCard />
    </SWrapper>
  );
}

const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.base};
  padding: ${({ theme }) => theme.spacing.base + ' ' + theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.base};
`;

const SStatus = styled.h2`
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.color.black};
  margin-bottom: ${({ theme }) => theme.spacing.xxs};
`;

const SSubText = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: ${({ theme }) => theme.fontWeight.meduim};
  color: ${({ theme }) => theme.color.gray_99};
`;
