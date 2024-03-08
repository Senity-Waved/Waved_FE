import styled from '@emotion/styled';
import { v4 as uuidv4 } from 'uuid';
import ChallengeCard from '@/components/home/ChallengeCard';
import IChallengeList from '@/types/IChallengeList';

interface IRecrutingList {
  title: string;
  subtitle: string;
  challenges: IChallengeList[];
}

export default function RecrutingList({
  title,
  subtitle,
  challenges,
}: IRecrutingList) {
  return (
    <SSection>
      <STitle>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </STitle>
      <SListGrid>
        {challenges.map((challenge) => (
          <ChallengeCard key={uuidv4()} {...challenge} />
        ))}
      </SListGrid>
    </SSection>
  );
}

const SSection = styled.section`
  &:last-of-type {
    padding-bottom: 5rem;
  }
`;

const STitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: calc(100% - 2.5rem);
  min-height: 44px;
  margin: 1.5rem 1.25rem;
  color: ${({ theme }) => theme.color.gray_3c};
  h2 {
    line-height: 24px;
    font-size: ${({ theme }) => theme.fontSize.subtitle1};
    font-weight: ${({ theme }) => theme.fontWeight.subtitle1};
  }
  p {
    line-height: 20px;
    font-size: ${({ theme }) => theme.fontSize.body4};
    font-weight: ${({ theme }) => theme.fontWeight.body4};
  }
`;

const SListGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(164px, 1fr));
  grid-row-gap: 1rem;
  grid-column-gap: 0.5rem;
  width: 100%;
  padding: 0 1.25rem;
`;
