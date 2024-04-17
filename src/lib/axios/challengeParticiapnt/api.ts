import axiosInstance from '../instance';

interface IPaymentResult {
  imp_uid: string;
  deposit: number;
}
export interface IPayments {
  paymentResult: IPaymentResult;
  myChallengeId: number;
}

interface IChallengeGroupApply {
  challengeGroupId: string;
  deposit: number;
}

/**
 * 챌린지 그룹 신청 POST
 * @param challengeGroupApplyProps - challengeGroupId, deposit
 * @returns (성공) myChallengeId
 */
const challengeGroupApplyApi = (
  challengeGroupApplyProps: IChallengeGroupApply,
) => {
  return axiosInstance.post(
    `/challengeGroups/${challengeGroupApplyProps.challengeGroupId}?deposit=${challengeGroupApplyProps.deposit}`,
  );
};

/**
 * 결제 후검증 POST
 * @param paymentsCheck - (param) myChallengeId, (body) imp_uid, deposit
 * @returns response.data
 */
const challengePaymentsApi = (paymentsCheck: IPayments) => {
  return axiosInstance.post(
    `/payments/${paymentsCheck.myChallengeId}`,
    paymentsCheck.paymentResult,
  );
};

export { challengeGroupApplyApi, challengePaymentsApi };
