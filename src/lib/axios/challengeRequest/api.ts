import axiosInstance from '../instance';

export interface IPaymentResult {
  imp_uid: string;
  deposit: number;
}
export interface IPayments {
  paymentResult: IPaymentResult;
  myChallengeId: number;
}

const challengeGroupApplyApi = (deposit: number) => {
  return axiosInstance.post(
    `/api/v1/challengeGroups/2/apply?deposit=${deposit}`,
  );
};

const challengePaymentsApi = (paymentsCheck: IPayments) => {
  return axiosInstance.post(
    `/api/v1/payments/${paymentsCheck.myChallengeId}`,
    paymentsCheck.paymentResult,
  );
};

export { challengeGroupApplyApi, challengePaymentsApi };
