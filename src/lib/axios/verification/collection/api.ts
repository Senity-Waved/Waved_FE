import { AxiosError } from 'axios';
import { IVerificationInfo } from '@/types/verification';
import axiosInstance from '../../instance';

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

export const getMyVerifiactionApi = async (
  groupId: string,
  date: string,
): Promise<IVerificationInfo[]> => {
  try {
    const response = await axiosInstance.get(
      `/challengeGroups/${groupId}/myVerifies?verificationDate=${date} 00:00:00.000`,
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    if (err.code === 'ECONNABORTED') {
      throw new Error('🚨 요청시간초과');
    } else if (
      err.response &&
      err.response.data === '해당 날짜에 존재하는 인증내역이 없습니다.'
    ) {
      throw new Error('emptyData');
    }
    throw error;
  }
};

export const getVerificationsApi = async (
  groupId: string,
  date: string, // -> 2024-03-19
): Promise<IVerificationInfo[]> => {
  try {
    const response = await axiosInstance.get(
      `/challengeGroups/${groupId}?verificationDate=${date} 00:00:00.0`,
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    if (err.code === 'ECONNABORTED') {
      throw new Error('🚨 요청시간초과');
    }
    throw error;
  }
};

export const getLikeCountApi = async (
  verificationId: number,
): Promise<{ verificationId: number; likedCount: number }> => {
  try {
    const response = await axiosInstance.get(`/likes/${verificationId}`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    if (err.code === 'ECONNABORTED') {
      throw new Error('🚨 요청시간초과');
    }
    throw error;
  }
};

export const postLikeApi = (verificationId: number) => {
  try {
    return axiosInstance.post(`/likes/${verificationId}`);
  } catch (error) {
    const err = error as AxiosError;
    if (err.code === 'ECONNABORTED') {
      throw new Error('🚨 요청시간초과');
    }
    throw error;
  }
};

export const deleteLikeApi = (verificationId: number) => {
  try {
    return axiosInstance.delete(`/likes/${verificationId}`);
  } catch (error) {
    const err = error as AxiosError;
    if (err.code === 'ECONNABORTED') {
      throw new Error('🚨 요청시간초과');
    }
    throw error;
  }
};

export const getQuizApi = async (
  groupId: string,
  date: string,
): Promise<{ date: string; question: string }> => {
  try {
    const response = await axiosInstance.get(
      `/verify/${groupId}/dates?quizDate=${date} 00:00:00.0`,
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    if (err.code === 'ECONNABORTED') {
      throw new Error('🚨 요청시간초과');
    }
    throw error;
  }
};
