import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/common/Layout';
import WriteLayout from '@/components/common/WriteLayout';
import writeLayoutText from '@/constants/writeLayoutText';
import TextArea from '@/components/common/TextArea';

export default function ChallengeRequest() {
  const router = useRouter();
  const { placeholder } = writeLayoutText['챌린지요청'];
  const [text, setText] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/challenge/request/success').catch((error) => {
      console.error('페이지 이동 실패', error);
    });
  };
  return (
    <Layout
      headerText="챌린지 요청"
      title="챌린지 요청"
      description="원하는 챌린지를 요청할 수 있는 페이지입니다."
      noFooter
    >
      <WriteLayout
        pageType="챌린지요청"
        text={text}
        handleSubmit={handleSubmit}
      >
        <TextArea placeholder={placeholder} setText={setText} />
      </WriteLayout>
    </Layout>
  );
}
