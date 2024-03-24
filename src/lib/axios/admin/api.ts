import adminInstance from '../adminInstance';

/**
 * 진행중인 챌린지 그룹 조회 GET
 * @returns challenge Groups List (성공), 관리자가 아닐땐 403 에러
 */
const getProgressChallengeGroupApi = () => {
  return adminInstance.get('/groups');
};

/**
 * 그룹별 인증 내역 조회 GET
 * @param groupId
 * @returns 그룹별 인증 내역 (인증아이디, 내용, 링크, imageUrl, 인증 날짜, 닉네임, 삭제처리여부)
 */
const getGroupVerifications = (groupId: number) => {
  return adminInstance.get(`/${groupId}/verifications`);
};

/**
 * 인증 내역 취소 DELETE
 * @param groupId 그룹 아이디
 * @param verificationId 인증 아이디
 * @returns (성공) 인증 취소 처리가 되었습니다
 */
const deleteVerfication = (groupId: number, verificationId: number) => {
  return adminInstance.delete(`/${groupId}/verifications/${verificationId}`);
};

export {
  getProgressChallengeGroupApi,
  getGroupVerifications,
  deleteVerfication,
};
