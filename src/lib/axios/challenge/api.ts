import IChallengeGroup from '@/types/challengeGroup';
import axiosInstance from '../instance';
import { IChallengeReview } from '@/pages/challenge/[groupId]';

interface IReviewList {
  content: IChallengeReview[];
  totalPages: number;
  totalElements: number;
  number: 0;
}

const challengeGroupApi = (groupId: string) => {
  return axiosInstance.get<IChallengeGroup>(
    `/api/v1/challengeGroups/info/${groupId}`,
  );
};

const reviewApi = ({
  challengeId,
  page,
}: {
  challengeId: number;
  page: number;
}) => {
  return axiosInstance.get<IReviewList>(
    `/api/v1/challenges/${challengeId}/reviews?page=${page}&limit=5`,
  );
};

export { challengeGroupApi, reviewApi };
