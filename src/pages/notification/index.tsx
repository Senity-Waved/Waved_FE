import styled from '@emotion/styled';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Layout from '@/components/common/Layout';
import EmptyView from '@/components/common/EmptyView';
import INotify from '@/types/notify';
import { deleteNotificationApi, notifyApi } from '@/lib/axios/notification/api';

export default function Notification() {
  const queryClient = useQueryClient();
  const { data, error } = useQuery<INotify[]>(
    ['notifyList'],
    async () => {
      const response = await notifyApi();
      return response.data;
    },
    { refetchOnWindowFocus: false },
  );

  if (error) {
    console.error('새로운 알림 유무 불러오기 실패', error);
  }

  const deleteMutation = useMutation(deleteNotificationApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(['notifyList']).catch(console.error);
    },
  });

  const handleDelete = (notificationId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    deleteMutation.mutate(notificationId);
  };

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
              <SNotificationBox key={notify.notificationId}>
                <button
                  type="button"
                  onClick={(event) =>
                    handleDelete(notify.notificationId, event)
                  }
                >
                  <SDeleteIcon
                    src="/icons/icon-trash.svg"
                    alt="삭제 아이콘"
                    width={16}
                    height={16}
                    priority
                  />
                </button>
                <p>{notify.notificationId}</p>
                <p>{notify.title}</p>
                <p>{notify.message}</p>
                <p>{notify.createDate}</p>
              </SNotificationBox>
            ))}
          </div>
        ) : (
          <EmptyView pageType="예치금내역" />
        )}
      </SNotificationWrapper>
    </Layout>
  );
}

const SNotificationWrapper = styled.div`
  min-height: 80vh;
  width: 100%;
  height: auto;
`;

const SNotificationBox = styled.div`
  border: 1px solid ${({ theme }) => theme.color.gray_3c};
  border-radius: 10px;
  margin: 0.625rem;
  padding: 0.625rem 0.3125rem;
`;

const SDeleteIcon = styled(Image)`
  cursor: pointer;
`;
