import axiosInstance from '../instance';

export const postMyVerificationApi = (groupId: string, formData: FormData) => {
  return axiosInstance.post(`/verify/${groupId}`, formData, {
    headers: { 'Content-type': 'multipart/form-data' },
  });
};

export const postMyCommitVerifiactionApi = (groupId: number) => {
  return axiosInstance.post(`/verify/${groupId}`);
};

export const getQuizApi = (groupId: string) => {
  return axiosInstance.get(`/verify/${groupId}`);
};

export const getMyStampApi = (myChallengeId: number) => {
  return axiosInstance.get(`/myChallenges/${myChallengeId}`);
};

export const getVerificationsApi = (groupId: string, date: string) => {
  // date -> 2024-03-19 00:00:00.0
  return axiosInstance.get(
    `/challengeGroups/${groupId}/dates?verificationDate=${date}`,
  );
};
