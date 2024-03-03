import styled from '@emotion/styled';

export interface IChallengeCard {}

export default function ChallengeCard({}: IChallengeCard) {
  return <SWrapper></SWrapper>;
}

const SWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.base};
  background-color: ${({ theme }) => theme.color.white};
  //shadow
`;
