import styled from '@emotion/styled';
import ChallengeItem, {
  IChallengeItem,
} from '@/components/mychallenge/ChallengeItem';
import challengeSectionText from '@/constants/challengeSectionText';

interface IChallengeSection {
  status: '진행 중' | '대기 중' | '진행 완료';
  scrollId: 'processing' | 'pending' | 'completed';
  // challenges: IChallengeItem [];
}

export default function ChallengeSection({
  status,
  scrollId,
  // challenges,
}: IChallengeSection) {
  const mainText = challengeSectionText[status].emoji + status;
  const { subText } = challengeSectionText[status];

  return (
    <SWrapper id={scrollId}>
      <div>
        <SStatus>{mainText}</SStatus>
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

const SWrapper = styled.section`
  background-color: ${({ theme }) => theme.color.gray_f9};
  padding: 1rem 1.25rem 2rem 1.25rem;
  scroll-margin-top: 56px;
`;

const SStatus = styled.h2`
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: ${({ theme }) => theme.fontWeight.headline2};
  color: ${({ theme }) => theme.color.gray_3c};
`;

const SSubText = styled.p`
  font-size: 0.875rem;
  line-height: 1.4;
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  color: ${({ theme }) => theme.color.gray_99};
`;

const SChallengeList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;
