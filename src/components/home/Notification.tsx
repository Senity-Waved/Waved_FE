import Image from 'next/image';
import Link from 'next/link';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { newNotificationApi } from '@/lib/axios/notification/api';

export default function Notification({ updateKey }: { updateKey: boolean }) {
  const { data, error } = useQuery<{ newEvent: boolean }>(
    ['hasNewEvent', updateKey],
    async () => {
      const response = await newNotificationApi();
      console.log(response.data);
      return response.data;
    },
  );
  if (error) {
    console.error('새로운 알림 유무 불러오기 실패', error);
  }
  return (
    <SNotification href="/notification" aria-label="알림 내역">
      <Image
        alt="알림"
        src={
          data?.newEvent
            ? '/icons/icon-notification-on.svg'
            : '/icons/icon-notification.svg'
        }
        width={24}
        height={24}
        style={{ verticalAlign: 'top' }}
        priority
      />
    </SNotification>
  );
}

const SNotification = styled(Link)`
  display: inline-block;
  width: 24px;
  height: 24px;
`;
