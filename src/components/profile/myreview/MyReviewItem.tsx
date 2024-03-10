import styled from '@emotion/styled';
import IMyReview from '@/types/myReview';

export default function MyReviewItem({
  challengeTitle,
  createdDate,
  context,
}: IMyReview) {
  return (
    <li>
      <h3>{challengeTitle}</h3>
      <span>{createdDate}</span>
      <p>{context}</p>
      <div>
        <button type="button">수정</button>
        <button type="button">삭제</button>
      </div>
    </li>
  );
}
