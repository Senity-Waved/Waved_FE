import axiosInstance from '../../instance';

/**
 * 인증(사진/링크/텍스트) 제출 POST
 * @param challengeGroupId
 * @param formData
 * @returns response.data
 */
export const postMyVerificationApi = async (
  groupId: string,
  formData: FormData,
): Promise<string> => {
  try {
    const response = await axiosInstance.post(`/verify/${groupId}`, formData, {
      headers: { 'Content-type': 'multipart/form-data' },
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
  } catch (error) {
    console.error(`postMyVerification API 실패`, error);
    throw error;
  }
};

/**
 * 인증(깃헙) 제출 POST
 * @param challengeGroupId
 * @returns response.data
 */
export const postMyCommitVerifiactionApi = (groupId: number) => {
  return axiosInstance.post(`/verify/${groupId}`);
};

/**
 * 오늘의 기술면접 챌린지 퀴즈 GET
 * @param challengeGroupId
 * @returns
 * {
 *  "date": "2024-03-24T00:00:00+09:00",
 *  "question": "3월 24일 백엔드 퀴즈 문제"
 * }
 */
export const getQuizApi = async (
  groupId: string,
): Promise<{ date: string; question: string }> => {
  const response = await axiosInstance.get(`/verify/${groupId}`);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.data;
};
