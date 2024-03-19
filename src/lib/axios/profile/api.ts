import IRegisterState from '@/types/register';
import axiosInstance from '../instance';

const registerApi = (registerData: IRegisterState) => {
  return axiosInstance.patch('/api/v1/members/edit', registerData);
};

const logoutApi = () => {
  return axiosInstance.post('/api/v1/members/logout');
};

export { registerApi, logoutApi };
