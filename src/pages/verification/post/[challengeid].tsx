import styled from '@emotion/styled';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/common/Layout';
import WriteLayout from '@/components/common/WriteLayout';
import writeLayoutText from '@/constants/writeLayoutText';
import PhotoInput from '@/components/verification/post/PhotoInput';
import TextArea from '@/components/common/TextArea';
import Portal from '@/components/modal/ModalPortal';
import Modal from '@/components/modal/Modal';

export default function VerificationPost() {
  //const { type } = useRouter().query;
  const { placeholder } = writeLayoutText['링크인증'];
  const [text, setText] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
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
        pageType="사진인증"
        handleSubmit={handleSubmit}
        text={text}
        file={file}
        onClick={openModal}
      >
        {/* <SQuestion>Q.출제된문제내용</SQuestion> */}
        {/* <TextArea placeholder={placeholder} setText={setText} /> */}
        <PhotoInput setFile={setFile} />
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
  font-size: 0.875rem;
  line-height: 1.4;
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  color: ${({ theme }) => theme.color.gray_52};
  margin-bottom: 0.25rem;
`;
