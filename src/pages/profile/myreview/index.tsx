import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import Layout from '@/components/common/Layout';
import MyReviewItem from '@/components/profile/myreview/MyReviewItem';
import SnackBar from '@/components/common/SnackBar';
import EmptyView from '@/components/common/EmptyView';
import ISnackBarState from '@/types/snackbar';
import REVIEW_SNACKBAR_TEXT from '@/constants/reviewSnackBarText';
import Modal from '@/components/modal/Modal';
import { getMyReviewsApi } from '@/lib/axios/review/api';
import { IMyReviewList } from '@/types/review';

interface IFetchMoreReviewsResponse extends IMyReviewList {
  nextPage: number;
}

export default function MyReview() {
  const router = useRouter();
  const { query } = router;
  const [snackBarState, setSnackBarState] = useState<ISnackBarState>({
    open: false,
    text: '',
  });

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
  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery<
    IFetchMoreReviewsResponse,
    Error
  >(['myReviews'], fetchMoreReviews, {
    getNextPageParam: (lastPage) => {
      const totalPages = lastPage.totalPages || 0;
      return lastPage.nextPage < totalPages ? lastPage.nextPage : undefined;
    },
  });

  const handleReviewMore = () => {
    if (!isFetching && hasNextPage) {
      fetchNextPage().catch((error) => {
        console.error('리뷰 더보기 실패', error);
      });
    }
  };

  const deleteReview = (reviewId: number) => {
    console.log(`삭제완료! ${reviewId}`);
    setSnackBarState({
      open: true,
      text: REVIEW_SNACKBAR_TEXT.DELETE,
    });
    setTimeout(() => {
      setSnackBarState({
        open: false,
        text: '',
      });
    }, 3500);
  };

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
    }
  }, [query, router]);

  return (
    <Layout headerText="나의 후기" title="나의 후기" noFooter>
      {!data || data.pages[0].totalElements === 0 ? (
        <SEmptyViewWrapper>
          <EmptyView pageType="내후기" />
        </SEmptyViewWrapper>
      ) : (
        <ul>
          {data.pages.map((page) => (
            <React.Fragment key={uuidv4()}>
              {page.content.map((review) => (
                <MyReviewItem
                  key={review.reviewId}
                  {...review}
                  onDelete={() => deleteReview(review.reviewId)}
                />
              ))}
            </React.Fragment>
          ))}
          {hasNextPage && (
            <button type="button" onClick={handleReviewMore}>
              더보기
            </button>
          )}
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
    </Layout>
  );
}

const SEmptyViewWrapper = styled.div`
  width: 100%;
  min-height: 80vh;
  height: auto;
`;
