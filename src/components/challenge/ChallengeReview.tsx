import React from 'react';
import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { SSection, SSectionTitle } from '@/pages/challenge/[groupId]';
import ChallengeReviewItem from '@/components/challenge/ChallengeReviewItem';
import EmptyView from '@/components/common/EmptyView';
import { IChallengeReviewList } from '@/types/review';
import { getMoreReviewsApi } from '@/lib/axios/challenge/api';

interface IFetchMoreReviewsResponse extends IChallengeReviewList {
  nextPage: number;
}

export default function ChallengeReview({
  reviewList,
  challengeId,
}: {
  reviewList: IChallengeReviewList;
  challengeId: number;
}) {
  const fetchMoreReviews = async ({
    pageParam = 1,
  }): Promise<IFetchMoreReviewsResponse> => {
    const response = await getMoreReviewsApi(pageParam, challengeId);
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
  >(['reviews', challengeId], fetchMoreReviews, {
    getNextPageParam: (lastPage) => {
      if (lastPage.nextPage < reviewList.totalPages) return lastPage.nextPage;
      return undefined;
    },
    initialData: {
      pages: [
        {
          content: reviewList.content,
          nextPage: 1,
          totalPages: reviewList.totalPages,
          totalElements: reviewList.totalElements,
        },
      ],
      pageParams: [0],
    },
    refetchOnWindowFocus: false,
  });

  const handleReviewMore = () => {
    if (!isFetching && hasNextPage) {
      fetchNextPage().catch((error) => {
        console.error('리뷰 더보기 실패', error);
      });
    }
  };
  return (
    <SSection id="review">
      <SSectionTitle>챌린지 참여자 후기</SSectionTitle>
      {!reviewList || reviewList.totalElements === 0 ? (
        <SEmptyViewWrapper>
          <EmptyView pageType="챌린지후기" center={false} size="small" />
        </SEmptyViewWrapper>
      ) : (
        <>
          <ul>
            {data?.pages.map((page) => (
              <React.Fragment key={uuidv4()}>
                {page.content.map((review) => (
                  <ChallengeReviewItem key={uuidv4()} {...review} />
                ))}
              </React.Fragment>
            ))}
          </ul>
          {hasNextPage && (
            <SMoreBtn type="button" onClick={handleReviewMore}>
              더보기
            </SMoreBtn>
          )}
        </>
      )}
    </SSection>
  );
}

const SEmptyViewWrapper = styled.div`
  position: relative;
  margin: 2rem 0;
`;

const SMoreBtn = styled.button`
  position: relative;
  display: block;
  margin: 0 auto;
  padding: 0 1.75rem 0 0.5rem;
  border-radius: 12px;
  line-height: 24px;
  background-color: ${({ theme }) => theme.color.light};
  color: ${({ theme }) => theme.color.gray_3c};
  font-size: ${({ theme }) => theme.fontSize.caption1};
  font-weight: ${({ theme }) => theme.fontWeight.caption1};
  &::after {
    content: '';
    position: absolute;
    top: 6px;
    right: 14px;
    width: 6px;
    height: 6px;
    border-bottom: 1px solid ${({ theme }) => theme.color.gray_3c};
    border-right: 1px solid ${({ theme }) => theme.color.gray_3c};
    transform: rotate(45deg);
  }
`;
