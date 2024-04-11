import styled from '@emotion/styled';
import Portal from '../modal/ModalPortal';

interface INotificationModal {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function NotificationModal({
  isOpen,
  onClose,
  onDelete,
}: INotificationModal) {
  const handleBackgroundClick = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    isOpen && (
      <Portal>
        <SModalWrapper onClick={handleBackgroundClick}>
          <SModalContent>
            <SModalBtn type="button" onClick={onDelete} deleteBtn>
              삭제하기
            </SModalBtn>
            <SModalBtn type="button" onClick={onClose} deleteBtn={false}>
              취소하기
            </SModalBtn>
          </SModalContent>
        </SModalWrapper>
      </Portal>
    )
  );
}

export const SModalWrapper = styled.div`
  z-index: 20;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-color: rgba(0, 0, 0, 0.6);
`;

const SModalContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 2.5rem;
`;

const SModalBtn = styled.button<{ deleteBtn: boolean }>`
  width: 19.5rem;
  height: 48px;
  background-color: ${({ theme }) => theme.color.white};
  margin-top: 1rem;
  border-radius: 8px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.subtitle1};
  font-weight: ${({ theme }) => theme.fontWeight.subtitle1};
  color: ${({ theme, deleteBtn }) =>
    deleteBtn ? theme.color.error : theme.color.normal};
`;
