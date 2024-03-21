import axiosInstance from '../instance';

export const postMyVerificationApi = (groupId: string, formData: FormData) => {
  return axiosInstance.post(`/api/v1/verify/${groupId}`, formData, {
    headers: { 'Content-type': 'multipart/form-data' },
  });
};

export const getQuizApi = (groupId: string) => {
  return axiosInstance.get(`/api/v1/verify/${groupId}`);
};

export const getVerifications = () => {};
