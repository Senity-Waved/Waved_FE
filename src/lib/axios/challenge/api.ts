import IChallengeGroup from '@/types/challengeGroup';
import axiosInstance from '../instance';

const challengeGroupApi = (groupId: string) => {
  return axiosInstance.get<IChallengeGroup>(
    `/api/v1/challengeGroups/info/${groupId}`,
  );
};

// eslint-disable-next-line import/prefer-default-export
export { challengeGroupApi };
