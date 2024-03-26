import depositStatus from '@/constants/depositStatus';

export type TDepositStatusKey = keyof typeof depositStatus;

export interface IDeposit {
  groupTitle: string;
  status: TDepositStatusKey;
  deposit: number;
  createDate: string;
}

export interface IMyDepositList {
  content: IDeposit[];
  totalPages: number;
  totalElements: number;
}

export interface IFetchMoreDepositResponse extends IMyDepositList {
  nextPage: number;
}
