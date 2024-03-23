import IVerificationInfo from '@/types/verification';
import axiosInstance from '../../instance';

export const getMyStampApi = async (
  myChallengeId: number,
): Promise<{ myVerifs: number[] }> => {
  const response = await axiosInstance.get(`/myChallenges/${myChallengeId}`);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.data;
};

export const getVerificationsApi = async (
  groupId: string,
  date: string,
): Promise<IVerificationInfo[]> => {
  // date -> 2024-03-19
  const response = await axiosInstance.get(
    `/challengeGroups/${groupId}?verificationDate=${date} 00:00:00.0`,
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.data;
};

export const getLikeCountApi = (verificationId: number) => {
  return axiosInstance.get(`/likes/${verificationId}`);
};

export const postLikeApi = (verificationId: number) => {
  return axiosInstance.post(`/likes/${verificationId}`);
};

export const deleteLikeApi = (verificationId: number) => {
  return axiosInstance.delete(`/likes/${verificationId}`);
};
