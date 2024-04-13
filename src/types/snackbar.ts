interface ISnackBarState {
  open: boolean;
  text: string;
  type?: 'correct' | 'warning' | 'notification';
}

export default ISnackBarState;
