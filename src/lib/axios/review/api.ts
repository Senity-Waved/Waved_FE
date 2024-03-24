import { IMyReviewList } from '@/types/review';
import axiosInstance from '../instance';

/**
 * 후기 작성 POST
 * @param myChallengeId
 * @returns response.data
 */
const postReviewApi = (myChallengeId: string, content: string) => {
  return axiosInstance.post(`/reviews/myChallenge/${myChallengeId}`, content);
};

/**
 * 내가 작성한 후기 목록 조회 GET
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
const getPrevReviewContentApi = (reviewId: number) => {
  return axiosInstance.get<IMyReviewList[]>(`/reviews/${reviewId}`);
};

/**
 * 후기 수정 PATCH
 * @param reviewId, content
 * @returns message (성공: '리뷰를 수정했습니다')
 */
const patchReviewApi = (reviewId: number, content: string) => {
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
  getPrevReviewContentApi,
  patchReviewApi,
  deleteReviewApi,
};
