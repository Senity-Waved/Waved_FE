import styled from '@emotion/styled';

interface IModal {
  onClose: () => void;
}

export default function Modal({ onClose }: IModal) {
  const handleBackgroundClick = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <SModalWrapper onClick={handleBackgroundClick}>
      <SModalContent>
        <div>모달 내용이 들어갑니다.</div>
        <SCloseBtn type="button" onClick={onClose}>
          닫기
        </SCloseBtn>
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
  background-color: rgba(0, 0, 0, 0.3);
`;

const SModalContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 100px;
  background-color: ${({ theme }) => theme.color.white};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SCloseBtn = styled.button`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-top: 15px;
`;
