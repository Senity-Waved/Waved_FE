import { AxiosInstance } from 'axios';
import IRecruitingChallenge from '@/types/recruitingChallenge';

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

export default getRecruitingChallengeApi;
