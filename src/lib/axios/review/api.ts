import { AxiosInstance } from 'axios';
import { IMyReviewList } from '@/types/review';
import axiosInstance from '../instance';

/**
 * 후기 작성 POST
 * @param myChallengeId, content
 * @returns message (성공: '리뷰를 작성했습니다')
 */
const postReviewApi = (myChallengeId: string, content: string) => {
  return axiosInstance.post(`/reviews/myChallenge/${myChallengeId}`, content);
};

/**
 * 내가 작성한 후기 목록 조회 GET
 * @param pageParam
 * @returns response.data
 */
const getMyReviewsApi = (pageParam: number) => {
  return axiosInstance.get<IMyReviewList>(
    `/members/reviews?page=${pageParam}&limit=5`,
  );
};

/**
 * 이전에 작성한 후기의 내용 GET
 * @param reviewId
 * @returns content
 */
const getPreviousReviewContentApi = (
  serverInstance: AxiosInstance,
  reviewId: string,
) => {
  return serverInstance.get<string>(`/reviews/${reviewId}`);
};

/**
 * 후기 수정 PATCH
 * @param reviewId, content
 * @returns message (성공: '리뷰를 수정했습니다')
 */
const patchReviewApi = (reviewId: string, content: string) => {
  return axiosInstance.patch(`/reviews/${reviewId}`, content);
};

/**
 * 후기 삭제 DELETE
 * @param reviewId
 * @returns message (성공: '리뷰를 삭제했습니다')
 */
const deleteReviewApi = (reviewId: number) => {
  return axiosInstance.delete(`/reviews/${reviewId}`);
};

export {
  postReviewApi,
  getMyReviewsApi,
  getPreviousReviewContentApi,
  patchReviewApi,
  deleteReviewApi,
};
