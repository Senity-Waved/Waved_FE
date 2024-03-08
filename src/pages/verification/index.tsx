import Layout from '@/components/common/Layout';
import WriteLayout from '@/components/common/WriteLayout';
import styled from '@emotion/styled';
import writeLayoutText from '@/constants/writeLayoutText';
import PhotoInput from '@/components/verification/PhotoInput';
import TextArea from '@/components/common/TextArea';
import { useState } from 'react';

interface IVerification {}

export default function Verification({}: IVerification) {
  const { placeholder } = writeLayoutText['링크인증'];
  const [text, setText] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const onSubmit = () => {
    console.log('test');
  };

  return (
    <Layout
      headerText="인증하기"
      title="인증하기"
      description="챌린지 인증방식에 맞게 인증을 진행하는 페이지입니다."
    >
      <WriteLayout
        pageType="링크인증"
        onSubmit={onSubmit}
        text={text}
        file={file}
      >
        {/* <SQuestion>Q.출제된문제내용</SQuestion> */}
        <TextArea placeholder={placeholder} setText={setText} />
        {/* <PhotoInput setFile={setFile} /> */}
      </WriteLayout>
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
