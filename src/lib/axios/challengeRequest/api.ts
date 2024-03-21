import axiosInstance from '../instance';

export interface IPaymentResult {
  imp_uid: string;
  deposit: number;
}
export interface IPayments {
  paymentResult: IPaymentResult;
  myChallengeId: number;
}

export interface IChallengeGroupApply {
  challengeGroupId: string;
  deposit: number;
}

const challengeGroupApplyApi = (
  challengeGroupApplyProps: IChallengeGroupApply,
) => {
  return axiosInstance.post(
    `/api/v1/challengeGroups/${challengeGroupApplyProps.challengeGroupId}/apply?deposit=${challengeGroupApplyProps.deposit}`,
  );
};

const challengePaymentsApi = (paymentsCheck: IPayments) => {
  return axiosInstance.post(
    `/api/v1/payments/${paymentsCheck.myChallengeId}`,
    paymentsCheck.paymentResult,
  );
};

export { challengeGroupApplyApi, challengePaymentsApi };
