import TGenderOrNull from './gender';

interface IRegisterState {
  termAgreement: boolean;
  birthYear: string;
  gender: TGenderOrNull;
  nickname: string;
  jobTitle: string;
}

export default IRegisterState;
