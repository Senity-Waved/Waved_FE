import styled from '@emotion/styled';
import { useState } from 'react';
import Image from 'next/image';
import { SModalWrapper } from '@/components/modal/Modal';
import Portal from '@/components/modal/ModalPortal';
import {
  SLikeBtn,
  SLikeCount,
  SLikeWrapper,
  SMineLabel,
} from './VerificationItem';
import screenSize from '@/constants/screenSize';
import IVerificationInfo from '@/types/verification';

export default function VerificationPhotoItem({
  verificationId,
  authorId,
  authorName,
  content,
  liked,
  likeCount,
  time,
}: IVerificationInfo) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const myId = 1;

  const toggleLike = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (isLiked) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
    }
  };

  return (
    <>
      <SVerificationWrapper onClick={openModal}>
        <SImgae src={content} alt="이미지" fill />
        <SShadow />
        {myId === authorId && <SMinePhotoLabel>내 인증</SMinePhotoLabel>}
        <SLikeWrapperWhite>
          <SLikeBtnWhite isLiked={isLiked} onClick={toggleLike} />
          <SLikeCountWhite>{likeCount}</SLikeCountWhite>
        </SLikeWrapperWhite>
      </SVerificationWrapper>
      {isModalOpen && (
        <Portal>
          <SModalWrapper>
            <SPhotoModal>
              <SImgae src={content} alt="이미지" fill />
              <SCloseBtn type="button" onClick={closeModal} />
            </SPhotoModal>
          </SModalWrapper>
        </Portal>
      )}
    </>
  );
}

const SVerificationWrapper = styled.li`
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  width: calc((100% - 0.5rem) / 2);
  aspect-ratio: 1/1;
  cursor: pointer;
`;

const SShadow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(to top, rgb(0, 0, 0, 0.6), rgb(0, 0, 0, 0));
`;

const SPhotoModal = styled.div`
  border-radius: 8px;
  min-width: ${screenSize.min - 64}px;
  max-width: ${screenSize.max - 64}px;
  aspect-ratio: 1/1;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 2rem;
`;

const SImgae = styled(Image)`
  object-fit: cover;
  object-position: center;
`;

const SCloseBtn = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 24px;
  height: 24px;
  background: url('/icons/icon-photo-delete.svg') no-repeat center;
`;

const SLikeWrapperWhite = styled(SLikeWrapper)`
  position: absolute;
  bottom: 0.5rem;
  left: 0.5rem;
`;

// prettier-ignore
const SLikeBtnWhite = styled(SLikeBtn)<{ isLiked: boolean }>`
  background-image: url(${({ isLiked }) => isLiked ? '/icons/icon-heart-white-filled.svg' : '/icons/icon-heart-white.svg'});
`;

const SLikeCountWhite = styled(SLikeCount)`
  color: ${({ theme }) => theme.color.white};
`;

const SMinePhotoLabel = styled(SMineLabel)`
  top: 0.75rem;
  right: 0.5rem;
`;
