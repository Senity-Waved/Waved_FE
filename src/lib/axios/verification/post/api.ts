import axiosInstance from '../../instance';

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

export const postMyCommitVerifiactionApi = (groupId: number) => {
  return axiosInstance.post(`/verify/${groupId}`);
};

export const getQuizApi = async (
  groupId: string,
): Promise<{ date: string; question: string }> => {
  try {
    const response = await axiosInstance.get(`/verify/${groupId}`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
  } catch (error) {
    console.error(`getQuiz API 실패`, error);
    throw error;
  }
};
