import { TMyChallengeInfo } from '@/types/myChallenge';
import axiosInstance from '../instance';

export const fetchMyChallenges = async (status: string) => {
  const response = await axiosInstance.get<TMyChallengeInfo[]>(
    `/myChallenges?status=${status}`,
  );
  return response.data;
};

export const refundRequestApi = (myChallengeId: number) => {
  return axiosInstance.post(`/payments/${myChallengeId}/completed`);
};

export default fetchMyChallenges;
