export interface IModal {
  mainText: string;
  subText?: string;
  image?: string;
  btnText: string;
  cancelBtnText?: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface IModalState extends IModal {
  isOpen: boolean;
}
