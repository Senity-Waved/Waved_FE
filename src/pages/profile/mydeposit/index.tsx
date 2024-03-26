import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import Layout from '@/components/common/Layout';
import DepositItem from '@/components/profile/DepositItem';
import EmptyView from '@/components/common/EmptyView';
import { getPaymentRecordsApi } from '@/lib/axios/profile/api';
import IPaymentRecord from '@/types/paymentRecord';

export default function MyDeposit() {
  const [paymentRecords, setPaymentRecords] = useState<IPaymentRecord[]>([]);

  useEffect(() => {
    const fetchPaymentRecords = async () => {
      try {
        const response = await getPaymentRecordsApi(0);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        setPaymentRecords(response.data.content);
      } catch (error) {
        console.error('예치금 내역 조회 실패:', error);
      }
    };

    fetchPaymentRecords().catch((error) => console.error(error));
  }, []);

  return (
    <Layout
      noFooter
      headerText="예치금 내역"
      title="예치금 내역"
      description="챌린지 참여 시 결제한  내역과 환급받은 내역을 확인할 수 있는 페이지입니다."
    >
      <h2 className="a11yHidden">예치금 내역</h2>
      <SMyDepositWrapper>
        {paymentRecords.length === 0 ? (
          <EmptyView pageType="예치금내역" />
        ) : (
          <ul>
            {paymentRecords.map((depositData) => (
              <DepositItem
                key={depositData.createDate}
                depositData={depositData}
              />
            ))}
          </ul>
        )}
      </SMyDepositWrapper>
    </Layout>
  );
}

const SMyDepositWrapper = styled.div`
  height: calc(100vh - 4.0625rem);
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
