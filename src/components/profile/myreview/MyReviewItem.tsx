import styled from '@emotion/styled';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { TMyReview } from '@/types/review';
import useModal from '@/hooks/useModal';
import formattedFormText from '@/utils/formattedFormText';
import parseDate from '@/utils/parseDate';
import { deleteReviewApi } from '@/lib/axios/review/api';

const formattedDate = (date: string) => {
  const [year, month, day] = parseDate(date);
  return `${year}년 ${month}월 ${day}일`;
};

export default function MyReviewItem({
  reviewId,
  groupTitle,
  createDate,
  content,
}: TMyReview) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { openModal, closeModal } = useModal();
  const { mutate: deleteReview } = useMutation(
    () => deleteReviewApi(reviewId),
    {
      onSuccess: () => {
        console.log(`${reviewId} 삭제완료!`);
        queryClient
          .invalidateQueries(['myReviews'])
          .catch((error) => console.error('쿼리 초기화 실패', error));
        router
          .replace({
            pathname: '/profile/myreview',
            query: {
              deleteReviewSuccess: true,
            },
          })
          .catch((error) => console.error('페이지 이동 실패', error));
      },
      onError: (error) => {
        console.error('리뷰 삭제 실패', error);
      },
    },
  );
  return (
    <SMyReviewItem>
      <STitleWrapper>
        <STitle>{groupTitle}</STitle>
        <SDate>{formattedDate(createDate)}</SDate>
      </STitleWrapper>
      <SContext>{formattedFormText(content)}</SContext>
      <SBtnWrapper>
        <SEditBtn
          href={{
            pathname: `/profile/myreview/edit`,
            query: { reviewId },
          }}
        >
          수정
        </SEditBtn>
        <SDeleteBtn
          type="button"
          onClick={() =>
            openModal({
              mainText: '남기신 후기를 삭제하시겠습니까?',
              btnText: '삭제하기',
              onClick: () => {
                deleteReview();
                closeModal();
              },
            })
          }
        >
          삭제
        </SDeleteBtn>
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

const SEditBtn = styled(Link)`
  display: inline-block;
  margin-right: 0.5rem;
  padding: 0.25rem 0.5rem;
  background-color: ${({ theme }) => theme.color.light};
  border-radius: 16px;
  line-height: 16px;
  color: ${({ theme }) => theme.color.normal};
  font-size: ${({ theme }) => theme.fontSize.caption2};
  font-weight: ${({ theme }) => theme.fontWeight.caption2};
  text-align: center;
  &::before {
    content: '';
    display: inline-block;
    width: 12px;
    height: 12px;
    margin: 0.125rem 0.25rem 0.125rem 0;
    background: url('/icons/icon-edit.svg') no-repeat center;
    vertical-align: bottom;
  }
`;

const SDeleteBtn = styled.button`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background-color: ${({ theme }) => theme.color.gray_ec};
  border-radius: 16px;
  line-height: 16px;
  color: ${({ theme }) => theme.color.gray_52};
  font-size: ${({ theme }) => theme.fontSize.caption2};
  font-weight: ${({ theme }) => theme.fontWeight.caption2};
  text-align: center;
  &::before {
    content: '';
    display: inline-block;
    width: 12px;
    height: 12px;
    margin: 0.125rem 0.25rem 0.125rem 0;
    background: url('/icons/icon-trash.svg') no-repeat center;
    vertical-align: bottom;
  }
`;
