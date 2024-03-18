import styled from '@emotion/styled';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/common/Layout';
import WriteLayout, { TPageType } from '@/components/common/WriteLayout';
import writeLayoutText from '@/constants/writeLayoutText';
import PhotoInput from '@/components/verification/post/PhotoInput';
import TextArea from '@/components/common/TextArea';
import Portal from '@/components/modal/ModalPortal';
import Modal from '@/components/modal/Modal';
import LinkInput from '@/components/verification/post/LinkInput';
import VERIFICATION_TYPE from '@/constants/verificationType';
import { TVerificationType } from '@/types/verification';

export default function VerificationPost() {
  const router = useRouter();
  // const verificationType = router.query.type as TVerificationType;
  let verificationType: TVerificationType;
  if (
    typeof router.query.type === 'string' &&
    ['TEXT', 'PHOTO', 'LINK'].includes(router.query.type)
  ) {
    verificationType = router.query.type as TVerificationType;
  } else {
    verificationType = 'TEXT';
  }
  const { groupId } = router.query;
  const pageType = VERIFICATION_TYPE[verificationType];
  const { placeholder } = writeLayoutText[pageType];
  const [text, setText] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [link, setLink] = useState<string>('');
  const [isLinkValid, setIsLinkaValid] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSubmit = () => {
    console.log('test');
  };

  return (
    <Layout
      headerText="인증하기"
      title="인증하기"
      description="챌린지 인증방식에 맞게 인증을 진행하는 페이지입니다."
      noFooter
    >
      <WriteLayout
        pageType={pageType as TPageType}
        handleSubmit={handleSubmit}
        text={text}
        file={file}
        isLinkValid={isLinkValid}
        onClick={openModal}
      >
        {verificationType === 'TEXT' && (
          <>
            <SQuestion>Q.출제된문제내용</SQuestion>
            <TextArea placeholder={placeholder} setText={setText} />
          </>
        )}
        {verificationType === 'PHOTO' && <PhotoInput setFile={setFile} />}
        {verificationType === 'LINK' && (
          <>
            <LinkInput
              isLinkValid={isLinkValid}
              setIsLinkValid={setIsLinkaValid}
              setLink={setLink}
            />
            <TextArea placeholder={placeholder} setText={setText} />
          </>
        )}
      </WriteLayout>
      {isModalOpen && (
        <Portal>
          <Modal
            image="/icons/icon-exclamation-mark.svg"
            mainText="인증을 제출 하시겠습니까?"
            subText="인증하기 제출 후 수정, 삭제할 수 없으니 확인 후 올려주시기 바랍니다."
            btnText="제출하기"
            onClick={handleSubmit}
            onClose={closeModal}
          />
        </Portal>
      )}
    </Layout>
  );
}

const SQuestion = styled.p`
  color: ${({ theme }) => theme.color.normal};
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  line-height: 1.6;
  padding: 1rem;
  background-color: ${({ theme }) => theme.color.light};
  border-radius: 12px;
  margin-bottom: 1rem;
`;
