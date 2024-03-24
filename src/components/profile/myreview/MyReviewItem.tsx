import styled from '@emotion/styled';
import Link from 'next/link';
import { TMyReview } from '@/types/review';
import useModal from '@/hooks/useModal';

interface IMyReviewItem extends TMyReview {
  onDelete: () => void;
}

export default function MyReviewItem({
  reviewId,
  groupTitle,
  createDate,
  content,
  onDelete,
}: IMyReviewItem) {
  const { openModal, closeModal } = useModal();
  return (
    <SMyReviewItem>
      <STitleWrapper>
        <STitle>{groupTitle}</STitle>
        <SDate>{createDate}</SDate>
      </STitleWrapper>
      <SContext>{content}</SContext>
      <SBtnWrapper>
        <SEditBtn
          href={{
            pathname: `/profile/myreview/edit`,
            query: { content, reviewId },
          }}
          as="myreview/edit"
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
                onDelete();
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
