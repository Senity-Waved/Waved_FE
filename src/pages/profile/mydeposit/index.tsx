import styled from '@emotion/styled';
import React, { useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import Layout from '@/components/common/Layout';
import DepositItem from '@/components/profile/DepositItem';
import EmptyView from '@/components/common/EmptyView';
import { getMyDepositApi } from '@/lib/axios/profile/api';
import { IFetchMoreDepositResponse } from '@/types/deposit';

const fetchMoreDeposit = async ({
  pageParam = 0,
}): Promise<IFetchMoreDepositResponse> => {
  const response = await getMyDepositApi(pageParam);
  return {
    content: response.data.content,
    nextPage: pageParam + 1,
    totalPages: response.data.totalPages,
    totalElements: response.data.totalElements,
  };
};

export default function MyDeposit() {
  const [ref, inView] = useInView();

  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery<
    IFetchMoreDepositResponse,
    Error
  >(['myDeposits'], fetchMoreDeposit, {
    getNextPageParam: (lastPage) => {
      const totalPages = lastPage.totalPages || 0;
      return lastPage.nextPage < totalPages ? lastPage.nextPage : undefined;
    },
  });

  const handleDepositMore = useCallback(() => {
    if (!isFetching && hasNextPage) {
      fetchNextPage().catch((error) =>
        console.error('예치금 더보기 실패', error),
      );
    }
  }, [isFetching, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (inView) handleDepositMore();
  }, [handleDepositMore, inView]);

  return (
    <Layout
      noFooter
      headerText="예치금 내역"
      title="예치금 내역"
      description="챌린지 참여 시 결제한  내역과 환급받은 내역을 확인할 수 있는 페이지입니다."
    >
      <h2 className="a11yHidden">예치금 내역</h2>
      <SMyDepositWrapper>
        {!data || data.pages[0].totalElements === 0 ? (
          <EmptyView pageType="예치금내역" />
        ) : (
          <ul>
            {data.pages.map((page) => (
              <React.Fragment key={uuidv4()}>
                {page.content.map((deposit) => (
                  <DepositItem key={deposit.createDate} depositData={deposit} />
                ))}
              </React.Fragment>
            ))}
            {hasNextPage && <div ref={ref} style={{ height: '20px' }} />}
          </ul>
        )}
      </SMyDepositWrapper>
    </Layout>
  );
}

const SMyDepositWrapper = styled.div`
  min-height: 80vh;
  width: 100%;
  height: auto;
`;
