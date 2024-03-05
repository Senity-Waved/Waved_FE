import styled from '@emotion/styled';
import ChallengeItem, {
  IChallengeItem,
} from '@/components/mychallenge/ChallengeItem';

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
          <ChallengeItem status={status} />
        </li>
        <li>
          <ChallengeItem status={status} />
        </li>
        <li>
          <ChallengeItem status={status} />
        </li>
      </SChallengeList>
    </SWrapper>
  );
}

const SWrapper = styled.div`
  padding: 1rem 1.25rem;
  margin-bottom: 1rem;
`;

const SStatus = styled.h2`
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: ${({ theme }) => theme.fontWeight.headline2};
  color: ${({ theme }) => theme.color.gray_3c};
  margin-bottom: 0.25rem;
`;

const SSubText = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  color: ${({ theme }) => theme.color.gray_99};
`;

const SChallengeList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;
