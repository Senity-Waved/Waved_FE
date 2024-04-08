import { useRecoilState } from 'recoil';
import { useCallback } from 'react';
import ASnackBarState from '@/atoms/snackBar';

export default function useSnackBar() {
  const [snackBarData, setSnackBarData] = useRecoilState(ASnackBarState);

  const openSnackBar = useCallback(
    (text: string, type: 'warning' | 'correct' = 'warning') => {
      setSnackBarData({
        open: true,
        text,
        type,
      });

      setTimeout(() => {
        setSnackBarData({
          open: false,
          text: '',
          type,
        });
      }, 3500);
    },
    [setSnackBarData],
  );

  return { snackBarData, openSnackBar };
}
