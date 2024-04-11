import styled from '@emotion/styled';
import Image from 'next/image';
import INotify from '@/types/notify';

interface INotificationBox {
  notification: INotify;
  openDeleteModal: (notificationId: number) => void;
}
function NotificationBox({ notification, openDeleteModal }: INotificationBox) {
  return (
    <SNotificationBox>
      <button
        type="button"
        onClick={() => openDeleteModal(notification.notificationId)}
      >
        <SDeleteIcon
          src="/icons/icon-trash.svg"
          alt="삭제 아이콘"
          width={16}
          height={16}
          priority
        />
      </button>
      <p>{notification.title}</p>
      <p>{notification.message}</p>
      <p>{notification.createDate}</p>
    </SNotificationBox>
  );
}

const SNotificationBox = styled.div`
  border: 1px solid ${({ theme }) => theme.color.gray_3c};
  border-radius: 10px;
  margin: 0.625rem;
  padding: 0.625rem 0.3125rem;
`;

const SDeleteIcon = styled(Image)`
  cursor: pointer;
`;

export default NotificationBox;
