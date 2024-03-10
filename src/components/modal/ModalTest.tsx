import { useState } from 'react';
import styled from '@emotion/styled';
import Portal from './ModalPortal';
import Modal from './Modal';

export default function ModalTest() {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const clickModalBtn = () => {
    console.log('모달 내 버튼 클릭시 필요한 동작 함수');
  };
  return (
    <SModalTestWrapper>
      <button type="button" onClick={openModal}>
        Open Modal
      </button>
      {isModalOpen && (
        <Portal>
          <Modal
            image="/icons/icon-exclamation-mark.svg"
            mainText="메인텍스트"
            subText="이 자리에 서브텍스트 입력하시면 됩니다. 서브텍스트가 없다면 아예 생략하시면 됩니다."
            btnText="출력하기"
            onClick={clickModalBtn}
            onClose={closeModal}
          />
        </Portal>
      )}
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
