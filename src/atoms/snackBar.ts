import { atom } from 'recoil';
import ISnackBarState from '@/types/snackbar';

const ASnackBarState = atom<ISnackBarState>({
  key: 'snackBarState',
  default: {
    open: false,
    text: '',
    type: 'warning',
  },
});

export default ASnackBarState;
