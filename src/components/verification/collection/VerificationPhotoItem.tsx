import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AxiosError } from 'axios';
import { SModalWrapper } from '@/components/modal/Modal';
import Portal from '@/components/modal/ModalPortal';
import {
  SLikeBtn,
  SLikeCount,
  SLikeWrapper,
  SMineLabel,
} from './VerificationItem';
import screenSize from '@/constants/screenSize';
import { IVerificationInfo } from '@/types/verification';
import {
  deleteLikeApi,
  getLikeCountApi,
  postLikeApi,
} from '@/lib/axios/verification/collection/api';
import useSnackBar from '@/hooks/useSnackBar';

interface IPhotoItem extends IVerificationInfo {
  isMine: boolean;
}

export default function VerificationPhotoItem({
  verificationId,
  isMine,
  imageUrl,
  liked,
  likesCount,
}: IPhotoItem) {
  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const [likeCountNum, setLikeCountNum] = useState<number>(likesCount);
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const { openSnackBar } = useSnackBar();

  const handleBackgroundClick = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const toggleLike = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (isLiked) {
      deleteLikeApi(verificationId)
        .then(() => {
          setIsLiked(false);
          getLikeCountApi(verificationId)
            .then((data) => {
              setLikeCountNum(data.likedCount);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          const err = error as AxiosError;
          const status = err.response?.status;
          const statusText = err.response?.statusText;
          if (status === 404 && statusText === 'Not Found') {
            openSnackBar('해당 인증 내역에 좋아요를 누르지 않았습니다.');
          }
        });
    } else {
      postLikeApi(verificationId)
        .then(() => {
          setIsLiked(true);
          getLikeCountApi(verificationId)
            .then((data) => {
              setLikeCountNum(data.likedCount);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          const err = error as AxiosError;
          const status = err.response?.status;
          const statusText = err.response?.statusText;
          if (status === 403 && statusText === 'Forbidden') {
            openSnackBar('이미 좋아요를 누른 인증 내역 입니다.');
          }
        });
    }
  };

  useEffect(() => {
    setIsLiked(liked);
    setLikeCountNum(likesCount);
  }, [liked, likesCount]);

  return (
    <>
      <SVerificationWrapper onClick={openModal}>
        <Image
          src={`${imageUrl}${process.env.NEXT_PUBLIC_IMAGE_TOKEN}`}
          alt="챌린지 인증 이미지"
          fill
          sizes="100%"
          style={{ objectFit: 'cover' }}
          priority
        />
        <SShadow />
        {isMine && <SMinePhotoLabel>내 인증</SMinePhotoLabel>}
        <SLikeWrapperWhite>
          <SLikeBtnWhite
            aria-label="좋아요 버튼"
            isLiked={isLiked}
            onClick={toggleLike}
          />
          <SLikeCountWhite>{likeCountNum}</SLikeCountWhite>
        </SLikeWrapperWhite>
      </SVerificationWrapper>
      {isModalOpen && (
        <Portal>
          <SModalWrapper onClick={handleBackgroundClick}>
            <SPhotoModal>
              <SImage
                src={`${imageUrl}${process.env.NEXT_PUBLIC_IMAGE_TOKEN}`}
                alt="챌린지 인증 이미지"
                fill
                sizes="100%"
              />
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
  width: 100%;
  min-width: ${screenSize.min - 64}px;
  max-width: ${screenSize.max - 64}px;
  aspect-ratio: 9/16;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 2rem;
  background-color: ${({ theme }) => theme.color.gray_52};
`;

const SImage = styled(Image)`
  object-fit: contain;
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
