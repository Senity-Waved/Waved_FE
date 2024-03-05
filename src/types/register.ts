import { TGenderOrNull } from './gender';

export interface IRegisterState {
  termAgreement: boolean;
  birthYear: string;
  gender: TGenderOrNull;
  nickname: string;
  jobTitle: string;
}
