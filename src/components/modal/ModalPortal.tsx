import { ReactElement } from 'react';
import { createPortal } from 'react-dom';

export default function Portal({ children }: { children: ReactElement }) {
  const modalRoot =
    typeof document === 'undefined' ? null : document.getElementById('_modal');

  return modalRoot ? createPortal(children, modalRoot) : null;
}
