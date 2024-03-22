import IRegisterState from '@/types/register';
import axiosInstance from '../instance';
import IProfile from '@/types/profile';

/**
 * 멤버 정보 수정 PATCH
 * @param memberInfo - Partial
 * @returns resonse.data
 */
const editMemberApi = (memberInfo: IRegisterState) => {
  return axiosInstance.patch('/members/edit', memberInfo);
};

/**
 * 로그아웃 POST
 * @returns response.data
 */
const logoutApi = () => {
  return axiosInstance.post('/members/logout');
};

/**
 * 프로필 정보 조회 GET
 * @returns Profile Info (nickname, github, jobTitle)
 */
const getProfileApi = () => {
  return axiosInstance.get<IProfile>('/members/profile');
};

/**
 * 프로필 수정 정보 조회 GET
 * @returns Edit Profile Info (nickname, gender, birthYear, jobTitle)
 */
const getEditProfileApi = () => {
  return axiosInstance.get<IRegisterState>('/members/profile/edit');
};

/**
 * 회원 탈퇴 DELETE
 */
const deleteMemberApi = () => {
  return axiosInstance.delete('/members/delete');
};

export {
  editMemberApi,
  logoutApi,
  getProfileApi,
  getEditProfileApi,
  deleteMemberApi,
};
