import { useState } from 'react';
import styled from '@emotion/styled';
import Portal from './ModalPortal';
import Modal from './Modal';

export default function ModalTest() {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <SModalTestWrapper>
      <button type="button" onClick={openModal}>
        Open Modal
      </button>
      {isModalOpen && (
        <Portal>
          <Modal onClose={closeModal} />
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
