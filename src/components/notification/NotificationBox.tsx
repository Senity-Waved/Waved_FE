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
      <div>
        <SNotificationBoxTitle>
          <SWavedLogoIcon
            src="/icons/icon-waved-logo.svg"
            alt="웨이브드 아이콘"
            width={20}
            height={20}
            priority
          />
          <SNotificationTitle>
            {notification.title.slice(0, -3)}
          </SNotificationTitle>
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
        <SNotificationContentBox>
          <SNotificationMessage>{notification.message}</SNotificationMessage>
          <SNotificationDate>{notificationDate}</SNotificationDate>
        </SNotificationContentBox>
      </div>
    </SNotificationBox>
  );
}

const SNotificationBox = styled.li`
  padding: 1.5rem 1.25rem;
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.color.gray_ec};
  }
  padding: 1.5rem 0.3125rem;
  margin: 0 1.25rem;
`;

const SNotificationBoxTitle = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.25rem;
`;

const SWavedLogoIcon = styled(Image)``;

const SNotificationTitle = styled.p`
  flex: 1;
  margin-left: 6px;
  font-size: ${({ theme }) => theme.fontSize.body1};
  font-weight: ${({ theme }) => theme.fontWeight.body1};
`;

const SDeleteIcon = styled(Image)`
  cursor: pointer;
`;

const SNotificationContentBox = styled.div`
  margin-left: 1.75rem;
  display: flex;
  flex-flow: row nowrap;
`;

const SNotificationMessage = styled.p`
  flex: 1;
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  color: ${({ theme }) => theme.color.gray_70};
`;

const SNotificationDate = styled.p`
  font-size: ${({ theme }) => theme.fontSize.caption2};
  font-weight: ${({ theme }) => theme.fontWeight.caption2};
  color: ${({ theme }) => theme.color.gray_99};
  margin-left: 0.25rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
`;

export default NotificationBox;
