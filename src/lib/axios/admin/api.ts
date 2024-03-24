import adminInstance from '../adminInstance';

const getProgressChallengeGroupApi = () => {
  return adminInstance.get('/groups');
};

const getGroupVerifications = (groupId: number) => {
  return adminInstance.get(`/${groupId}/verifications`);
};

const deleteVerfication = (groupId: number, verificationId: number) => {
  return adminInstance.delete(`/${groupId}/verifications/${verificationId}`);
};

export {
  getProgressChallengeGroupApi,
  getGroupVerifications,
  deleteVerfication,
};
