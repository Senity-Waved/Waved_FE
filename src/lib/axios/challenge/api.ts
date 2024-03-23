import IChallengeGroup from '@/types/challengeGroup';
import axiosInstance from '../instance';
import { IReviewList } from '@/types/review';

/**
 * 챌린지 그룹 정보 GET
 * @param groupId
 * @param token (optional)
 * @returns response.data
 */
const getChallengeGroupApi = (groupId: string, token?: string) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return axiosInstance.get<IChallengeGroup>(
    `/challengeGroups/info/${groupId}`,
    {
      headers,
    },
  );
};

/**
 * 리뷰 목록 조회 GET
 * @param challengeId
 * @returns response.data
 */
const getReviewsApi = (challengeId: number) => {
  return axiosInstance.get<IReviewList>(
    `/challenges/${challengeId}/reviews?page=0&limit=5`,
  );
};

export { getChallengeGroupApi, getReviewsApi };
