import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import Layout from '@/components/common/Layout';
import EmptyView from '@/components/common/EmptyView';
import INotify from '@/types/notify';
import { notifyApi } from '@/lib/axios/notification/api';

export default function Notification() {
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
              <div key={uuidv4()}>
                <p>{notify.title}</p>
                <p>{notify.message}</p>
                <p>{notify.createDate}</p>
              </div>
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
