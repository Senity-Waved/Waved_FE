import styled from '@emotion/styled';
import Image from 'next/image';
import Btn from '../common/Btn';
import useModal from '@/hooks/useModal';
import Portal from './ModalPortal';

export default function Modal() {
  const { modalData, closeModal } = useModal();

  const handleBackgroundClick = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    modalData.isOpen && (
      <Portal>
        <SModalWrapper onClick={handleBackgroundClick}>
          <SModalContent>
            {modalData.image && (
              <SModalImage
                src={modalData.image}
                alt="모달 이미지"
                width={88}
                height={88}
                priority
              />
            )}
            <SModalMainText marginBottom={!!modalData.subText}>
              {modalData.mainText}
            </SModalMainText>
            {modalData.subText && (
              <SModalSubText>{modalData.subText}</SModalSubText>
            )}
            <Btn
              btns={[
                {
                  text: modalData.cancelBtnText || '아니요',
                  styleType: 'gray',
                  size: 'small',
                  onClick: closeModal,
                },
                {
                  text: modalData.btnText,
                  styleType: 'primary',
                  size: 'small',
                  onClick: modalData.onClick,
                },
              ]}
            />
          </SModalContent>
        </SModalWrapper>
      </Portal>
    )
  );
}

export const SModalWrapper = styled.div`
  z-index: 20;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
`;

const SModalContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 19.5rem;
  background-color: ${({ theme }) => theme.color.white};
  padding: 2rem 1rem 1rem 1rem;
  border-radius: 8px;
`;

const SModalMainText = styled.h2<{ marginBottom: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.headline2};
  line-height: 1.4;
  color: ${({ theme }) => theme.color.gray_3c};
  font-weight: ${({ theme }) => theme.fontWeight.headline2};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? '.5rem' : '1.5rem')};
`;

const SModalSubText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.body4};
  line-height: 1.4;
  color: ${({ theme }) => theme.color.gray_70};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  margin-bottom: 1.5rem;
  text-align: center;
`;

const SModalImage = styled(Image)`
  margin-bottom: 1rem;
`;
