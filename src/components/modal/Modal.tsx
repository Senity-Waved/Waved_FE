import styled from '@emotion/styled';
import Image from 'next/image';
import Btn from '../common/Btn';

interface IModal {
  mainText: string;
  subText?: string;
  image?: string;
  btnText: string;
  onClick: () => void;
  onClose: () => void;
}

export default function Modal({
  mainText,
  subText,
  image,
  btnText,
  onClick,
  onClose,
}: IModal) {
  const handleBackgroundClick = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <SModalWrapper onClick={handleBackgroundClick}>
      <SModalContent>
        {image && (
          <SModalImage
            src={image}
            alt="모달 이미지"
            width={88}
            height={88}
            priority
          />
        )}
        <SModalMainText marginBottom={!!subText}>{mainText}</SModalMainText>
        {subText && <SModalSubText>{subText}</SModalSubText>}
        <Btn
          btns={[
            {
              text: '아니요',
              styleType: 'gray',
              size: 'small',
              onClick: onClose,
            },
            {
              text: btnText,
              styleType: 'primary',
              size: 'small',
              onClick,
            },
          ]}
        />
      </SModalContent>
    </SModalWrapper>
  );
}
const SModalWrapper = styled.div`
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
  padding: 2rem 1rem 0.75rem 1rem;
  border-radius: 8px;
`;

const SModalMainText = styled.h2<{ marginBottom: boolean }>`
  font-size: 1.125rem;
  line-height: 1.4;
  color: ${({ theme }) => theme.color.gray_3c};
  font-weight: ${({ theme }) => theme.fontWeight.subtitle1};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? '.5rem' : '1.5rem')};
`;

const SModalSubText = styled.p`
  font-size: 1rem;
  line-height: 1.4;
  color: ${({ theme }) => theme.color.gray_70};
  font-weight: ${({ theme }) => theme.fontWeight.body2};
  margin-bottom: 1.5rem;
  text-align: center;
`;

const SModalImage = styled(Image)`
  margin-bottom: 1rem;
`;
