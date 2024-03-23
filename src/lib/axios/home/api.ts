import IRecruitingChallenge from '@/types/recruitingChallenge';
import axiosInstance from '../instance';
import IMyProcessingChallenge from '@/types/myProcessingChallenge';

/**
 * 유저의 진행 중인 챌린지 정보 GET
 * @param
 * @returns response.data
 */
const getMyProcessingChallengeApi = () => {
  return axiosInstance.get<IMyProcessingChallenge[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/myChallenges?status=PROGRESS`,
  );
};

/**
 * 모집 중인 챌린지 정보 GET
 * @param
 * @returns response.data
 */
const getRecruitingChallengeApi = () => {
  return axiosInstance.get<IRecruitingChallenge[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/challenges/waiting`,
  );
};

export { getMyProcessingChallengeApi, getRecruitingChallengeApi };
