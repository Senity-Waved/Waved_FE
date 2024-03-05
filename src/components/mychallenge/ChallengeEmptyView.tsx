import styled from '@emotion/styled';
import EmptyView from '../common/EmptyView';

export default function ChallengeEmptyView() {
  return (
    <>
      <SEmptyWrapper>
        <EmptyView pageType="마이챌린지" />
      </SEmptyWrapper>
      <SExploreWrapper>
        <h2>챌린지 둘러보기</h2>
      </SExploreWrapper>
    </>
  );
}

const SEmptyWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  padding: 1.5rem 0 2rem 0;
`;

const SExploreWrapper = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.color.white};
  padding: 1.5rem 1.25rem 1rem 1.25rem;
  margin-top: 0.375rem;

  h2 {
    font-size: 1.25rem;
    line-height: 1.4;
    font-weight: ${({ theme }) => theme.fontWeight.headline2};
    color: ${({ theme }) => theme.color.gray_3c};
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 6px;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    background-color: ${({ theme }) => theme.color.gray_ec};
  }
`;
