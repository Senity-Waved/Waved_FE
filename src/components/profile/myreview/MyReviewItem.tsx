import styled from '@emotion/styled';
import IMyReview from '@/types/myReview';

export default function MyReviewItem({
  challengeTitle,
  createdDate,
  context,
}: IMyReview) {
  return (
    <SMyReviewItem>
      <STitleWrapper>
        <STitle>{challengeTitle}</STitle>
        <SDate>{createdDate}</SDate>
      </STitleWrapper>
      <SContext>{context}</SContext>
      <SBtnWrapper>
        <SEditBtn type="button">수정</SEditBtn>
        <SDeleteBtn type="button">삭제</SDeleteBtn>
      </SBtnWrapper>
    </SMyReviewItem>
  );
}

const SMyReviewItem = styled.li`
  display: block;
  min-height: 167px;
  padding: 1.5rem 1.25rem;
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.color.gray_ec};
  }
`;

const STitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 16px;
`;

const STitle = styled.h3`
  flex: 1;
  font-size: ${({ theme }) => theme.fontSize.body2};
  font-weight: ${({ theme }) => theme.fontWeight.body2};
`;

const SDate = styled.span`
  flex-shrink: 0;
  color: ${({ theme }) => theme.color.gray_83};
  font-size: ${({ theme }) => theme.fontSize.caption2};
  font-weight: ${({ theme }) => theme.fontWeight.caption2};
`;

const SContext = styled.p`
  margin: 1rem 0;
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
`;

const SBtnWrapper = styled.div`
  text-align: right;
`;

const SBtn = styled.button`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  line-height: 16px;
  font-size: ${({ theme }) => theme.fontSize.caption2};
  font-weight: ${({ theme }) => theme.fontWeight.caption2};
  border-radius: 16px;
  &::before {
    content: '';
    display: inline-block;
    width: 12px;
    height: 12px;
    margin: 0.125rem 0.25rem 0.125rem 0;
    background-repeat: no-repeat;
    background-position: center;
    vertical-align: bottom;
  }
`;

const SEditBtn = styled(SBtn)`
  margin-right: 0.5rem;
  background-color: ${({ theme }) => theme.color.light};
  color: ${({ theme }) => theme.color.normal};
  &::before {
    background-image: url('/icons/icon-edit.svg');
  }
`;

const SDeleteBtn = styled(SBtn)`
  background-color: ${({ theme }) => theme.color.gray_ec};
  color: ${({ theme }) => theme.color.gray_52};
  &::before {
    background-image: url('/icons/icon-trash.svg');
  }
`;
