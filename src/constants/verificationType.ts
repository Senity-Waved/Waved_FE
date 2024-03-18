interface IVerificationType {
  [key: string]: string;
}

const VERIFICATION_TYPE: IVerificationType = {
  TEXT: '글인증',
  LINK: '링크인증',
  PHOTO: '사진인증',
  GITHUB: '깃헙인증',
};

export default VERIFICATION_TYPE;
