import styled from '@emotion/styled';

export interface IChallengeItem {}

export default function ChallengeItem({}: IChallengeItem) {
  return <SWrapper></SWrapper>;
}

const SWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.base};
  background-color: ${({ theme }) => theme.color.white};
  //shadow
`;
