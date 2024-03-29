import { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { IVerificationInfo } from '@/types/verification';
import {
  deleteLikeApi,
  getLikeCountApi,
  postLikeApi,
} from '@/lib/axios/verification/collection/api';

interface IVerificationItem extends IVerificationInfo {
  selectedId: number;
  setSelectedId: React.Dispatch<React.SetStateAction<number>>;
  isMine: boolean;
}

export default function VerificationItem({
  verificationId,
  isMine,
  nickname,
  content,
  isLiked,
  likesCount,
  link,
  selectedId,
  setSelectedId,
}: IVerificationItem) {
  const [liked, setLiked] = useState<boolean>(isLiked);
  const [likeCountNum, setLikeCountNum] = useState<number>(likesCount);
  const isSelected = selectedId === verificationId;

  const toggleLike = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (liked) {
      deleteLikeApi(verificationId)
        .then(() => {
          setLiked(false);
          getLikeCountApi(verificationId)
            .then((data) => {
              setLikeCountNum(data.likedCount);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => console.error(error));
    } else {
      postLikeApi(verificationId)
        .then(() => {
          setLiked(true);
          getLikeCountApi(verificationId)
            .then((data) => {
              setLikeCountNum(data.likedCount);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => console.error(error));
    }
  };

  const toggleContent = () => {
    if (isSelected) {
      setSelectedId(0);
    } else {
      setSelectedId(verificationId);
    }
  };

  const clickLink = (event: React.MouseEvent<HTMLElement>) =>
    event.stopPropagation();

  return (
    <SWrapper isSelected={isSelected} onClick={toggleContent}>
      {isMine && <SMineLabel>내 인증</SMineLabel>}
      <SAuthor>{nickname}</SAuthor>
      {link && (
        <SLink href={link} target="_blank" onClick={clickLink}>
          {link}
        </SLink>
      )}
      <SContent isSelected={isSelected}>{content}</SContent>
      <SLikeWrapper>
        <SLikeBtn type="button" onClick={toggleLike} isLiked={liked} />
        <SLikeCount>{likeCountNum}</SLikeCount>
      </SLikeWrapper>
    </SWrapper>
  );
}

const SWrapper = styled.li<{ isSelected: boolean }>`
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.gray_ec};
  padding: 1rem;
  margin-bottom: 1rem;
  position: relative;
  background-color: ${({ theme, isSelected }) =>
    isSelected && theme.color.gray_ec};
  transition: 0.2s ease-in;
`;

const SAuthor = styled.h3`
  color: ${({ theme }) => theme.color.gray_3c};
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  line-height: 1.5625rem;
  margin-bottom: 0.5rem;
`;

const SLink = styled.a`
  color: ${({ theme }) => theme.color.middle};
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  width: fit-content;

  &::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url('/icons/icon-link.svg') no-repeat center;
  }
`;

const ellipsisStyle = css`
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const SContent = styled.p<{ isSelected: boolean }>`
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.color.gray_52 : theme.color.gray_83};
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  margin-bottom: 1rem;
  line-height: 1.7;
  transition: 0.2s ease-in;
  white-space: pre-wrap;
  ${({ isSelected }) => isSelected || ellipsisStyle}
`;

export const SLikeWrapper = styled.div`
  display: flex;
  align-items: center;
`;

// prettier-ignore
export const SLikeBtn = styled.button<{ isLiked: boolean }>`
  width: 24px;
  height: 24px;
  background-image: url(${({ isLiked }) => isLiked ? '/icons/icon-heart-black-filled.svg' : '/icons/icon-heart-black.svg'});
  background-position: center;
  background-repeat: no-repeat;
  margin-right: .25rem;
`;

export const SLikeCount = styled.span`
  color: ${({ theme }) => theme.color.gray_52};
  font-size: ${({ theme }) => theme.fontSize.body2};
  font-weight: ${({ theme }) => theme.fontWeight.body2};
`;

export const SMineLabel = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.5rem;
  color: ${({ theme }) => theme.color.white};
  font-size: ${({ theme }) => theme.fontSize.caption2};
  font-weight: ${({ theme }) => theme.fontWeight.caption2};
  border-radius: 16px;
  background-color: ${({ theme }) => theme.color.gray_52};
`;
