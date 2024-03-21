import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { IModal } from '@/types/modal';
import modalState from '@/atoms/modal';

export default function useModal() {
  const [modalData, setModalData] = useRecoilState(modalState);

  const openModal = useCallback(
    ({
      mainText,
      subText = '',
      image = '',
      btnText,
      cancelBtnText = '',
      onClick,
    }: IModal) => {
      setModalData({
        isOpen: true,
        mainText,
        subText,
        image,
        btnText,
        cancelBtnText,
        onClick,
      });
    },
    [setModalData],
  );

  const closeModal = useCallback(() => {
    setModalData({
      isOpen: false,
      mainText: '',
      subText: '',
      image: '',
      btnText: '',
      onClick: () => {},
    });
  }, [setModalData]);

  return { modalData, openModal, closeModal };
}
