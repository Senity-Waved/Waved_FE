import { useRecoilState } from 'recoil';
import { useCallback } from 'react';
import ASnackBarState from '@/atoms/snackBar';

export default function useSnackBar() {
  const [snackBarData, setSnackBarData] = useRecoilState(ASnackBarState);

  const openSnackBar = useCallback(
    (text: string) => {
      setSnackBarData({
        open: true,
        text,
        type: 'warning',
      });

      setTimeout(() => {
        setSnackBarData({
          open: false,
          text: '',
          type: 'warning',
        });
      }, 3500);
    },
    [setSnackBarData],
  );

  return { snackBarData, openSnackBar };
}
