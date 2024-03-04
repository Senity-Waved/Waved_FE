import styled from '@emotion/styled';
import ChallengeItem, { IChallengeItem } from './ChallengeItem';

interface IChallengeSection {
  status: '진행중' | '대기중' | '진행완료';
  statusImogi: '🧑🏻‍💻' | '👀' | '🥳';
  subText: string;
  // challenges: IChallengeItem [];
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
      <SChallengeList>
        <li>
          <ChallengeItem />
        </li>
        <li>
          <ChallengeItem />
        </li>
        <li>
          <ChallengeItem />
        </li>
      </SChallengeList>
    </SWrapper>
  );
}

const SWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.base + ' ' + theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.base};
`;

const SStatus = styled.h2`
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.color.gray_3c};
  margin-bottom: ${({ theme }) => theme.spacing.xxs};
`;

const SSubText = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: ${({ theme }) => theme.fontWeight.meduim};
  color: ${({ theme }) => theme.color.gray_99};
`;

const SChallengeList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.base};
  margin-top: ${({ theme }) => theme.spacing.base};
`;
