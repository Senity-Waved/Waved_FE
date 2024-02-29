interface IBtn {
  type: 'button' | 'submit';
  text: string;
  isAble: boolean;
  backgroundColor: string;
  fontColor: string;
  size: 'large' | 'small';
}

export default IBtn;
