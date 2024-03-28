import { useCallback } from 'react';
import { RecoilEnv, useRecoilState } from 'recoil';
import { IModal } from '@/types/modal';
import modalState from '@/atoms/modal';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

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
