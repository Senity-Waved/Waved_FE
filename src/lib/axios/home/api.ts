import { AxiosInstance } from 'axios';
import IRecruitingChallenge from '@/types/recruitingChallenge';
import IMyProcessingChallenge from '@/types/myProcessingChallenge';

/**
 * 유저의 진행 중인 챌린지 정보 GET
 * @returns response.data
 */
const getMyProcessingChallengeApi = (serverInstance: AxiosInstance) => {
  return serverInstance.get<IMyProcessingChallenge[]>(
    `/myChallenges?status=PROGRESS`,
  );
};

/**
 * 모집 중인 챌린지 정보 GET
 * @returns response.data
 */
const getRecruitingChallengeApi = (serverInstance: AxiosInstance) => {
  return serverInstance.get<IRecruitingChallenge[]>(`/challenges/waiting`, {
    headers: {
      Authorization: '',
    },
  });
};

export { getMyProcessingChallengeApi, getRecruitingChallengeApi };
