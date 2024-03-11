import styled from '@emotion/styled';

interface IChallengeReview {
  author: string;
  jobTitle?: string;
  createdDate: string;
  context: string;
}

export default function ChallengeReviewItem({
  author,
  jobTitle,
  createdDate,
  context,
}: IChallengeReview) {
  return (
    <SReviewItem>
      <SReviewInfo>
        <SAuthor>{author}</SAuthor>
        {jobTitle && <SJobTitle>{jobTitle}</SJobTitle>}
        <SDate>{createdDate}</SDate>
      </SReviewInfo>
      <SReviewContext>{context}</SReviewContext>
    </SReviewItem>
  );
}

const SReviewItem = styled.li`
  position: relative;
  padding: 1.5rem 1.25rem;
  &:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.color.gray_ec};
  }
`;

const SReviewInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  line-height: 22px;
`;

const SAuthor = styled.span`
  flex-shrink: 0;
  color: ${({ theme }) => theme.color.gray_3c};
  font-size: ${({ theme }) => theme.fontSize.body2};
  font-weight: ${({ theme }) => theme.fontWeight.body2};
`;

const SJobTitle = styled.span`
  position: relative;
  flex-shrink: 0;
  padding-left: 1.125rem;
  color: ${({ theme }) => theme.color.gray_52};
  font-size: ${({ theme }) => theme.fontSize.caption1};
  font-weight: ${({ theme }) => theme.fontWeight.caption1};
  &::before {
    content: '';
    position: absolute;
    display: inline-block;
    width: 1px;
    height: 16px;
    top: 3px;
    left: 10px;
    background-color: ${({ theme }) => theme.color.gray_bf};
  }
`;

const SDate = styled.span`
  flex: 1 0 0;
  text-align: right;
  color: ${({ theme }) => theme.color.gray_70};
  font-size: ${({ theme }) => theme.fontSize.caption2};
  font-weight: ${({ theme }) => theme.fontWeight.caption2};
`;

const SReviewContext = styled.p`
  color: ${({ theme }) => theme.color.gray_3c};
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
`;
