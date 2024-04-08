import styled from '@emotion/styled';
import Layout from '@/components/common/Layout';
import EmptyView from '@/components/common/EmptyView';

export default function Notification() {
  const isEmpty = false;

  return (
    <Layout
      noFooter
      headerText="알림"
      title="알림"
      description="챌린지 관련 알림 내역을 확인할 수 있는 페이지입니다."
    >
      <h2 className="a11yHidden">알림 내역</h2>
      <SNotificationWrapper>
        {isEmpty ? <EmptyView pageType="예치금내역" /> : <div>알림 내역</div>}
      </SNotificationWrapper>
    </Layout>
  );
}

const SNotificationWrapper = styled.div`
  min-height: 80vh;
  width: 100%;
  height: auto;
`;
