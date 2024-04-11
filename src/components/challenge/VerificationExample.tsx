import Image from 'next/image';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { SSectionTitle } from '@/pages/challenge/[groupId]';
import ScrollXBox from '@/components/common/ScrollXBox';
import Portal from '@/components/modal/ModalPortal';
import { SModalWrapper } from '@/components/modal/Modal';
import screenSize from '@/constants/screenSize';
import parseChallengeTitle from '@/utils/parseChallengeTitle';
import VERIFICATION_EXAMPLE from '@/constants/verificationExamplePaths';

export default function VeirificationExample({ title }: { title: string }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1);
  const openModal = (index: number) => setSelectedImageIndex(index);
  const closeModal = () => setSelectedImageIndex(-1);

  const challengeTitle = parseChallengeTitle(title);
  const examplePaths = (VERIFICATION_EXAMPLE[challengeTitle] || []).map((url) =>
    decodeURIComponent(url),
  );

  return (
    examplePaths.length > 0 && (
      <>
        <SSectionTitle>예시</SSectionTitle>
        <ScrollXBox>
          <SVerificationExample>
            {examplePaths.map((url, index) => (
              <React.Fragment key={url}>
                <SButton onClick={() => openModal(index)}>
                  <Image
                    src={url}
                    width={150}
                    height={218}
                    priority
                    alt={`${title} 인증 예시`}
                  />
                </SButton>
                {selectedImageIndex === index && (
                  <Portal>
                    <SModalWrapper>
                      <SPhotoModal>
                        <SModalImage
                          src={url}
                          alt={`${title} 인증 예시 크게 보기`}
                          fill
                          sizes="100%"
                        />
                        <SCloseBtn type="button" onClick={closeModal} />
                      </SPhotoModal>
                    </SModalWrapper>
                  </Portal>
                )}
              </React.Fragment>
            ))}
          </SVerificationExample>
        </ScrollXBox>
      </>
    )
  );
}

const SVerificationExample = styled.div`
  width: 100%;
  padding: 1rem 1.25rem 0;
`;

const SButton = styled.button`
  &:not(:last-child) {
    margin-right: 0.625rem;
  }
  &:last-child {
    margin-right: 1.25rem;
  }
  img {
    display: inline-block;
  }
`;

const SPhotoModal = styled.div`
  position: relative;
  aspect-ratio: 150/218;
  min-width: calc(${screenSize.min}px - 4rem);
  max-width: calc(${screenSize.max}px - 4rem);
  width: calc(100% - 4rem);
  border-radius: 8px;
  overflow: hidden;
`;

const SModalImage = styled(Image)`
  object-fit: cover;
`;

const SCloseBtn = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 24px;
  height: 24px;
  background: url('/icons/icon-photo-delete.svg') no-repeat center;
`;
