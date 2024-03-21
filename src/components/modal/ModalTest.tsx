import { useState } from 'react';
import styled from '@emotion/styled';
import Modal from './Modal';
import useModal from '@/hooks/useModal';

export default function ModalTest() {
  const { openModal, closeModal } = useModal();
  const clickModalBtn = () => {
    console.log('모달 내 버튼 클릭시 필요한 동작 함수');
  };
  return (
    <SModalTestWrapper>
      <button
        type="button"
        onClick={() => {
          () =>
            openModal({
              image: '/icons/icon-exclamation-mark.svg',
              mainText: '모달 테스트를 하시겠습니까?',
              subText: '모달동작을 테스트하고자 하면 예를 눌러주세요.',
              btnText: '예',
              onClick: () => {
                clickModalBtn();
                closeModal();
              },
            });
        }}
      ></button>
      <Modal />
    </SModalTestWrapper>
  );
}

const SModalTestWrapper = styled.div`
  text-align: center;
  & button {
    font-size: 1.125rem;
    background-color: ${({ theme }) => theme.color.normal};
    padding: 5px;
    border-radius: 5px;
    color: ${({ theme }) => theme.color.white};
  }
`;
