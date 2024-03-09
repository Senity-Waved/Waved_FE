import styled from '@emotion/styled';
import { useState } from 'react';
import Image from 'next/image';

interface IPhotoInput {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export default function PhotoInput({ setFile }: IPhotoInput) {
  // const [photo, setPhoto] = useState<File>();
  const [photoPreview, setPhotoPreview] = useState('');

  const uploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const photo = e.target.files;
    if (photo && photo.length === 1) {
      const preview = URL.createObjectURL(photo[0]);
      setPhotoPreview(preview);
      setFile(photo[0]);
    }
  };

  const deletePhoto = () => {
    setPhotoPreview('');
    setFile(null);
  };

  return (
    <SWrapper>
      {photoPreview ? (
        <>
          <SPhotoPreview src={photoPreview} alt="첨부 사진 미리보기" fill />
          <SPhotoDeleteBtn type="button" onClick={deletePhoto}>
            <Image
              src="/icons/icon-photo-delete.svg"
              alt="첨부 사진 삭제 버튼 이미지"
              width={24}
              height={24}
            />
          </SPhotoDeleteBtn>
        </>
      ) : (
        <SPhotoUploadBtn htmlFor="photo">
          <Image
            src="/icons/icon-photo-upload.svg"
            alt="사진 첨부 버튼 이미지"
            width={109}
            height={109}
            priority
          />
          <SPhotoUploadInput
            type="file"
            id="photo"
            accept="image/*"
            onChange={uploadPhoto}
          />
        </SPhotoUploadBtn>
      )}
    </SWrapper>
  );
}

const SWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 8px;
  box-shadow: 0 3px 8px 2px rgba(35, 62, 112, 0.05);
  margin-bottom: 1.5rem;
  overflow: hidden;
`;

const SPhotoPreview = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const SPhotoUploadBtn = styled.label`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SPhotoUploadInput = styled.input`
  display: none;
`;

const SPhotoDeleteBtn = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  height: 24px;
`;
