export interface ISnackBarState {
  open: boolean;
  text: string;
  type?: 'correct' | 'warning';
}
