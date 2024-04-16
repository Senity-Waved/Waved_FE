import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { useInView } from 'react-intersection-observer';
import { SHeaderWrapper } from '@/components/common/Header';
import { SLayoutWrapper } from '@/components/common/Layout';
import Modal from '@/components/modal/Modal';
import MyReviewItem from '@/components/profile/myreview/MyReviewItem';
import SnackBar from '@/components/common/SnackBar';
import EmptyView from '@/components/common/EmptyView';
import ISnackBarState from '@/types/snackbar';
import REVIEW_SNACKBAR_TEXT from '@/constants/reviewSnackBarText';
import { getMyReviewsApi } from '@/lib/axios/review/api';
import { IMyReviewList } from '@/types/review';

export interface IFetchMoreReviewsResponse extends IMyReviewList {
  nextPage: number;
}

const fetchMoreReviews = async ({
  pageParam = 0,
}): Promise<IFetchMoreReviewsResponse> => {
  const response = await getMyReviewsApi(pageParam);
  return {
    content: response.data.content,
    nextPage: pageParam + 1,
    totalPages: response.data.totalPages,
    totalElements: response.data.totalElements,
  };
};

export default function MyReview() {
  const router = useRouter();
  const { query } = router;
  const [snackBarState, setSnackBarState] = useState<ISnackBarState>({
    open: false,
    text: '',
  });
  const [ref, inView] = useInView();

  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery<
    IFetchMoreReviewsResponse,
    Error
  >(['myReviews'], fetchMoreReviews, {
    getNextPageParam: (lastPage) => {
      const totalPages = lastPage.totalPages || 0;
      return lastPage.nextPage < totalPages ? lastPage.nextPage : undefined;
    },
  });

  const handleReviewMore = useCallback(() => {
    if (!isFetching && hasNextPage) {
      fetchNextPage().catch((error) => {
        console.error('리뷰 더보기 실패', error);
      });
    }
  }, [isFetching, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (inView) {
      handleReviewMore();
    }
  }, [inView, handleReviewMore]);

  useEffect(() => {
    const handleRouting = (
      snackBarText: string,
      snackBarType: 'correct' | 'warning' = 'correct',
    ): void => {
      setSnackBarState({
        open: true,
        text: snackBarText,
        type: snackBarType,
      });
      router
        .replace('/profile/myreview', undefined, { shallow: true })
        .catch((error: Error) =>
          console.error('쿼리스트링 제거 후 페이지 이동 실패', error),
        );
      setTimeout(() => {
        setSnackBarState({
          open: false,
          text: '',
        });
      }, 3500);
    };
    if (query.editReviewSuccess) {
      handleRouting(REVIEW_SNACKBAR_TEXT.EDIT);
    } else if (query.deleteReviewSuccess) {
      handleRouting(REVIEW_SNACKBAR_TEXT.DELETE);
    }
  }, [query, router]);

  return (
    <SMyReviewHeader>
      <Head>
        <title>WAVED | 나의 후기</title>
        <meta
          name="description"
          content="내가 작성한 후기를 볼 수 있는 페이지입니다."
        />
      </Head>
      <h1 className="a11yHidden">WAVED</h1>
      <SHeaderWrapper>
        <SGoProfileLink href="/profile" aria-label="프로필로 이동" />
        <STitle>나의 후기</STitle>
      </SHeaderWrapper>
      <main>
        {!data || data.pages[0].totalElements === 0 ? (
          <SEmptyViewWrapper>
            <EmptyView pageType="내후기" />
          </SEmptyViewWrapper>
        ) : (
          <ul>
            {data.pages.map((page) => (
              <React.Fragment key={uuidv4()}>
                {page.content.map((review) => (
                  <MyReviewItem key={review.reviewId} {...review} />
                ))}
              </React.Fragment>
            ))}
            {hasNextPage && <div ref={ref} style={{ height: '20px' }} />}
          </ul>
        )}
        {snackBarState.open && (
          <SnackBar
            text={snackBarState.text}
            type={snackBarState.type}
            noFooter
          />
        )}
        <Modal />
      </main>
    </SMyReviewHeader>
  );
}

const SMyReviewHeader = styled(SLayoutWrapper)`
  position: relative;
  margin-bottom: 0;
`;

const SGoProfileLink = styled(Link)`
  position: absolute;
  width: 24px;
  height: 24px;
  margin: 0 20px;
  background: url('/icons/icon-left-arrow.svg') no-repeat center;
`;

const STitle = styled.h2`
  flex: 1;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.headline2};
  font-weight: ${({ theme }) => theme.fontWeight.headline2};
`;

const SEmptyViewWrapper = styled.div`
  width: 100%;
  min-height: 80vh;
  height: auto;
`;
