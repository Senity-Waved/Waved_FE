import styled from '@emotion/styled';
import Layout from '@/components/common/Layout';
import DepositItem from '@/components/profile/DepositItem';
import EmptyView from '@/components/common/EmptyView';

export default function MyDeposit() {
  const depositData = {
    challengeName: '백엔드 기술면접 챌린지 2기',
    challengeResult: '성공',
    challengeDate: '2023년 02월 27일',
    deposit: 5000,
  };
  const haveDeposit = true;
  return (
    <Layout
      noFooter
      headerText="예치금 내역"
      title="예치금 내역"
      description="챌린지 참여 시 결제한  내역과 환급받은 내역을 확인할 수 있는 페이지입니다."
    >
      <SMyDepositWrapper>
        <h2 className="a11yHidden">예치금 내역</h2>
        {haveDeposit ? (
          <div>
            <DepositItem depositData={depositData} />
            <DepositItem depositData={depositData} />
          </div>
        ) : (
          <EmptyView pageType="예치금내역" />
        )}
      </SMyDepositWrapper>
    </Layout>
  );
}

const SMyDepositWrapper = styled.div``;
