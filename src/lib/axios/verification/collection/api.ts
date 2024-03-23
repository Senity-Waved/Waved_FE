import axiosInstance from '../../instance';

export const getMyStampApi = (myChallengeId: number) => {
  return axiosInstance.get(`/myChallenges/${myChallengeId}`);
};

export const getVerificationsApi = (groupId: string, date: string) => {
  // date -> 2024-03-19 00:00:00.0
  return axiosInstance.get(
    `/challengeGroups/${groupId}/dates?verificationDate=${date}`,
  );
};
