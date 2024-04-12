import styled from '@emotion/styled';
import Image from 'next/image';
import INotify from '@/types/notify';
import formatNotificationDate from '@/types/formatNotificationDate';

interface INotificationBox {
  notification: INotify;
  openDeleteModal: (notificationId: number) => void;
}
function NotificationBox({ notification, openDeleteModal }: INotificationBox) {
  const notificationDate = formatNotificationDate(notification.createDate);

  return (
    <SNotificationBox>
      <SNotificationBoxTitle>
        <p>{notification.title}</p>
        <button
          type="button"
          onClick={() => openDeleteModal(notification.notificationId)}
        >
          <SDeleteIcon
            src="/icons/icon-notification-trash.svg"
            alt="삭제 아이콘"
            width={16}
            height={16}
            priority
          />
        </button>
      </SNotificationBoxTitle>

      <p>{notification.message}</p>
      <p>{notificationDate}</p>
    </SNotificationBox>
  );
}

const SNotificationBox = styled.li`
  height: 106px;
  padding: 1.5rem 1.25rem;
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.color.gray_ec};
  }
  margin: 0.625rem;
  padding: 0.625rem 0.3125rem;
`;

const SNotificationBoxTitle = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const SDeleteIcon = styled(Image)`
  cursor: pointer;
`;

export default NotificationBox;
