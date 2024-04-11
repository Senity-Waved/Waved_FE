import styled from '@emotion/styled';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Layout from '@/components/common/Layout';
import EmptyView from '@/components/common/EmptyView';
import INotify from '@/types/notify';
import { deleteNotificationApi, notifyApi } from '@/lib/axios/notification/api';
import NotificationBox from '@/components/notification/NotificationBox';
import NotificationModal from '@/components/notification/NotificationModal';

export default function Notification() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState<
    number | null
  >(null);
  const queryClient = useQueryClient();
  const { data, error } = useQuery<INotify[]>(
    ['notifyList'],
    async () => {
      const response = await notifyApi();
      return response.data;
    },
    { refetchOnWindowFocus: false },
  );

  const deleteMutation = useMutation(deleteNotificationApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(['notifyList']).catch(console.error);
      setIsModalOpen(false);
    },
  });

  const openDeleteModal = (notificationId: number) => {
    setSelectedNotificationId(notificationId);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (selectedNotificationId !== null) {
      deleteMutation.mutate(selectedNotificationId);
    }
  };

  if (error) {
    console.error('새로운 알림 유무 불러오기 실패', error);
  }

  return (
    <Layout
      noFooter
      headerText="알림"
      title="알림"
      description="챌린지 관련 알림 내역을 확인할 수 있는 페이지입니다."
    >
      <h2 className="a11yHidden">알림 내역</h2>
      <SNotificationWrapper>
        {data && data.length > 0 ? (
          <div>
            {data.map((notify) => (
              <NotificationBox
                key={notify.notificationId}
                notification={notify}
                openDeleteModal={() => openDeleteModal(notify.notificationId)}
              />
            ))}
          </div>
        ) : (
          <EmptyView pageType="알림내역" />
        )}
      </SNotificationWrapper>
      <NotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={handleDelete}
      />
    </Layout>
  );
}

const SNotificationWrapper = styled.div`
  min-height: 80vh;
  width: 100%;
  height: auto;
`;
