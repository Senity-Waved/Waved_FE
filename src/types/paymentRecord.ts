import { PaymentStatusKey } from '@/components/profile/DepositItem';

export default interface IPaymentRecord {
  groupTitle: string;
  status: PaymentStatusKey;
  deposit: number;
  createDate: string;
}
