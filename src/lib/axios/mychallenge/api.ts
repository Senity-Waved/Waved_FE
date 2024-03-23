import axios from 'axios';
import { CookieValueTypes } from 'cookies-next';
import { TMyChallengeInfo } from '@/types/myChallenge';
import axiosInstance from '../instance';

export const fetchMyChallenges = async (
  status: string,
  cookieToken: CookieValueTypes,
) => {
  try {
    const response = await axios.get<TMyChallengeInfo[]>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/myChallenges?status=${status}`,
      {
        headers: {
          Authorization: `Bearer ${cookieToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(`my${status}Challenge API 실패`, error);
    return [];
  }
};

export default fetchMyChallenges;

/**
 * 후기 작성 POST
 * @param myChallengeId
 * @returns response.data
 */
export const postMyReviewApi = (myChallengeId: string, content: string) => {
  return axiosInstance.post(`/reviews/myChallenge/${myChallengeId}`, content);
};
