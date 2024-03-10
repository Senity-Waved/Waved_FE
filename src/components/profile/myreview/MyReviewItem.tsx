import { useState } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import IMyReview from '@/types/myReview';
import Portal from '@/components/modal/ModalPortal';
import Modal from '@/components/modal/Modal';

interface IMyReviewItem extends IMyReview {
  onDelete: () => void;
}

export default function MyReviewItem({
  id,
  challengeTitle,
  createdDate,
  context,
  onDelete,
}: IMyReviewItem) {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);
  return (
    <>
      <SMyReviewItem>
        <STitleWrapper>
          <STitle>{challengeTitle}</STitle>
          <SDate>{createdDate}</SDate>
        </STitleWrapper>
        <SContext>{context}</SContext>
        <SBtnWrapper>
          <SEditBtn
            href={{
              pathname: `myreview/edit`,
              query: { context, reviewId: id },
            }}
            as={`myreview/edit?reviewId=${id}`}
          >
            수정
          </SEditBtn>
          <SDeleteBtn type="button" onClick={openDeleteModal}>
            삭제
          </SDeleteBtn>
        </SBtnWrapper>
      </SMyReviewItem>
      {isDeleteModalOpen && (
        <Portal>
          <Modal
            mainText="남기신 후기를 삭제하시겠습니까?"
            btnText="삭제하기"
            onClick={() => {
              onDelete();
              closeDeleteModal();
            }}
            onClose={closeDeleteModal}
          />
        </Portal>
      )}
    </>
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
