import styled from '@emotion/styled';
import { TChallengeReview } from '@/types/review';
import parseDate from '@/utils/parseDate';
import { JOB_TITLE_KR } from '@/constants/jobTitle';

const formattedDate = (date: string) => {
  const [year, month, day] = parseDate(date);
  return `${year}년 ${month}월 ${day}일`;
};

export default function ChallengeReviewItem({
  nickname,
  jobTitle,
  createDate,
  content,
}: TChallengeReview) {
  return (
    <SReviewItem>
      <SReviewInfo>
        <SAuthor>{nickname}</SAuthor>
        {jobTitle && <SJobTitle>{JOB_TITLE_KR[jobTitle]}</SJobTitle>}
        <SDate>{formattedDate(createDate)}</SDate>
      </SReviewInfo>
      <SReviewContent>{content}</SReviewContent>
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

const SReviewContent = styled.p`
  color: ${({ theme }) => theme.color.gray_3c};
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
`;
