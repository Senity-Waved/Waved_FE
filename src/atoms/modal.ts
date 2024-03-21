import { atom } from 'recoil';
import { IModalState } from '@/types/modal';

const modalState = atom<IModalState>({
  key: 'modalState',
  default: {
    isOpen: false,
    mainText: '',
    subText: '',
    image: '',
    btnText: '',
    cancelBtnText: '',
    onClick: () => {},
  },
});

export default modalState;
