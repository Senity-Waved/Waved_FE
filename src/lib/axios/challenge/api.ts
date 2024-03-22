import IChallengeGroup from '@/types/challengeGroup';
import axiosInstance from '../instance';
import { TChallengeReview } from '@/types/review';

interface IReviewList {
  content: TChallengeReview[];
  totalPages: number;
  totalElements: number;
}

const challengeGroupApi = (groupId: string) => {
  return axiosInstance.get<IChallengeGroup>(`/challengeGroups/info/${groupId}`);
};

const reviewApi = ({
  challengeId,
  page,
}: {
  challengeId: number;
  page: number;
}) => {
  return axiosInstance.get<IReviewList>(
    `/challenges/${challengeId}/reviews?page=${page}&limit=5`,
  );
};

export { challengeGroupApi, reviewApi };
