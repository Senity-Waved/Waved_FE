import { IVerificationInfo } from '@/types/verification';
import axiosInstance from '../../instance';

/**
 * 인증내역 페이지 정보 GET
 * @param myChallengeId
 * @returns
 * {
 *  myVerifys: [0,1,2]
 *  groupTitle: "백엔드 기술면접 챌린지 2기",
 *  startDate: "2024-03-11T00:00:00+09:00",
 *  endDate: "2024-03-24T00:00:00+09:00"
 * }
 */
export const getCollectionInfoApi = async (
  myChallengeId: string,
): Promise<{
  myVerifs: number[];
  groupTitle: string;
  startDate: string;
  endDate: string;
}> => {
  const response = await axiosInstance.get(`/myChallenges/${myChallengeId}`);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.data;
};

/**
 * 날짜별 내 인증 내역 GET
 * @param myChallengeId
 * @param date
 * @returns response.data -> 내역이 담겨있는 배열
 */
export const getMyVerifiactionApi = async (
  groupId: string,
  date: string, // -> 2024-03-19
): Promise<IVerificationInfo[]> => {
  const response = await axiosInstance.get(
    `/challengeGroups/${groupId}/myVerifies?verificationDate=${date} 09:00:00.000`,
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.data;
};

/**
 * 날짜별 전체사용자 인증 내역 GET
 * @param myChallengeId
 * @param date
 * @returns response.data -> 내역이 담겨있는 배열
 */
export const getVerificationsApi = async (
  groupId: string,
  date: string, // -> 2024-03-19
): Promise<IVerificationInfo[]> => {
  const response = await axiosInstance.get(
    `/challengeGroups/${groupId}?verificationDate=${date} 09:00:00.0`,
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.data;
};

/**
 * 좋아요 개수 GET
 * @param verificationId
 * @returns
 * {
 *  verificationId: 1,
 *  likedCount: 0
 * }
 */
export const getLikeCountApi = async (
  verificationId: number,
): Promise<{ verificationId: number; likedCount: number }> => {
  const response = await axiosInstance.get(`/likes/${verificationId}`);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.data;
};

/**
 * 좋아요 POST
 * @param verificationId
 * @returns response.data
 */
export const postLikeApi = (verificationId: number) => {
  return axiosInstance.post(`/likes/${verificationId}`);
};

/**
 * 좋아요 DELETE
 * @param verificationId
 * @returns response.data
 */
export const deleteLikeApi = (verificationId: number) => {
  return axiosInstance.delete(`/likes/${verificationId}`);
};

/**
 * 날짜별 기술면접 챌린지 퀴즈 GET
 * @param challengeGroupId
 * @param date
 * @returns
 * {
 *  date: "2024-03-24T00:00:00+09:00",
 *  question: "3월 24일 백엔드 퀴즈 문제"
 * }
 */
export const getQuizApi = async (
  groupId: string,
  date: string,
): Promise<{ date: string; question: string }> => {
  const response = await axiosInstance.get(
    `/quiz/${groupId}/dates?quizDate=${date} 09:00:00.0`,
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.data;
};
