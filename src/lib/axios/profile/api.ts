import IRegisterState from '@/types/register';
import axiosInstance from '../instance';

const registerApi = (data: IRegisterState) => {
  return axiosInstance.patch('/api/v1/members/edit', data);
};

const logoutApi = () => {
  return axiosInstance.post('/api/v1/members/logout');
};

export { registerApi, logoutApi };
