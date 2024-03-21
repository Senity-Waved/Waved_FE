import IRegisterState from '@/types/register';
import axiosInstance from '../instance';

/**
 * 멤버 정보 수정 PATCH
 * @param registerData - Partial
 * @returns resonse.data
 */
const registerApi = (registerData: IRegisterState) => {
  return axiosInstance.patch('/api/v1/members/edit', registerData);
};

/**
 * 로그아웃 POST
 * @returns response.data
 */
const logoutApi = () => {
  return axiosInstance.post('/api/v1/members/logout');
};

export { registerApi, logoutApi };
